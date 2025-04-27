import bcrypt from 'bcryptjs';
import Validator from 'validator';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import razorpay from 'razorpay';

const registerUser = async (req, res) => {
    try {
        //  const {name,email,password} = req.body;
        const { name, email: rawEmail, password } = req.body;
        const email = rawEmail?.trim().toLowerCase();


        if (!name || !email || !password) {
            return res.json({ sucess: false, message: "Please enter all fields" });
        }

        if (!Validator.isEmail(email)) {
            return res.json({ sucess: false, message: "Invalid Email" });
        }

        if (password.length < 8) {
            return res.json({ sucess: false, message: "Password must be atleast 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const userData = {
            name,
            email,
            password: hash
        };

        const user = new userModel(userData);
        const newUser = await user.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({ sucess: true, token, user: newUser });

    } catch (error) {

        res.json({ sucess: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email?.trim().toLowerCase();

        if (!email || !password) {
            return res.json({ sucess: false, message: "Please enter all fields" });
        }
        const user = await userModel.findOne({ email });
        console.log("Looking for user with email:", email);

        if (!user) {
            return res.json({ sucess: false, message: "user not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ sucess: true, token, user });
        }

        else {
            return res.json({ sucess: false, message: "Invalid Credentials" });
        }



    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });
    }
}

//api for getting user data
const gettingUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ sucess: false, message: "Please enter all fields" });
        }
        const user = await userModel.findById(userId).select("-password");
        res.json({ sucess: true, user });
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });
    }
}

//api for updating user data
const updateUserData = async (req, res) => {
    try {
        const { userId, name, phone, gender, address, dob } = req.body;
        const imagefile = req.file;
        if (!name || !phone || !gender || !address || !dob) {
            return res.json({ sucess: false, message: "Please enter all fields" });
        }
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender

        })
        if (imagefile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ sucess: true, message: "sucesfully updated" })

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });

    }
}

//api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const doctorData = await doctorModel.findById(docId).select("-password");
        if (!doctorData.available) {
            return res.json({ sucess: false, message: "Doctor is not available" });
        }

        let slots_booked = doctorData.slots_booked;
        //checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ sucess: false, message: "Slot already booked" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);

        }

        const userData = await userModel.findById(userId).select("-password");

        delete doctorData.slots_booked;


        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            doctorData,
            amount: doctorData.fee,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save the slots booked in doctor model
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ sucess: true, message: "Appointment booked successfully" })
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });
    }
}

//api to get all appointments of user
const getAllAppointments = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        if (!appointments) {
            return res.json({ sucess: false, message: "No appointments found" });
        }
        res.json({ sucess: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });
    }
}

//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        console.log('Appointment Object:', appointmentData);

        if (!appointmentData) {
            return res.json({ sucess: false, message: "No appointment found" });
        }
        //verify if the appointment belongs to the user
        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ sucess: false, message: "You are not authorized to cancel this appointment" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        //remove the slot from the doctor model
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        if (!doctorData) {
            return res.json({ sucess: false, message: "No doctor found" });
        }
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => slot !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ sucess: true, message: "Appointment cancelled successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });
    }
}

//api for make payment using razorpay
// const instance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const makePayment = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ sucess: false, message: "No appointment found" });
//         }

//         //creating options for razorpay payment
//         const options = {
//             amount: appointmentData.amount * 100, // amount in the smallest currency unit
//             currency: process.env.CURRENCY,
//             receipt: appointmentId,


//         }

//         //creating order in razorpay
//         const order = await instance.orders.create(options);
//         if (!order) {
//             return res.json({ sucess: false, message: "Error in creating order" });
//         }
//         res.json({ sucess: true, order });


//     } catch (error) {
//         console.log(error);
//         res.json({ sucess: false, message: error.message });
//     }

// }


export { registerUser, loginUser, gettingUserData, updateUserData, bookAppointment, getAllAppointments, cancelAppointment };