import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// API to add a doctor
const addDoctor = async (req, res) => {
    try {
        let { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
        const imageFile = req.file;

        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || fee === undefined || !address) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Parse address if it's a stringified JSON
        if (typeof address === 'string') {
            try {
                address = JSON.parse(address);
            } catch (err) {
                return res.status(400).json({ success: false, message: "Invalid address format" });
            }
        }

        // Optional: check for line1 and line2 inside address
        if (!address.line1 || !address.line2) {
            return res.status(400).json({ success: false, message: "Address must include line1 and line2" });
        }

        // Check if file is uploaded
        if (!imageFile || !imageFile.path) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        // Create doctor data object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            date: Date.now(),
            address,
            image: imageUrl,
        };

        // Save to DB
        const doctor = new doctorModel(doctorData);
        await doctor.save();

        return res.status(201).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Api to get all doctors

const getAllDoctors = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}).select("-password");
        
        res.status(200).json({ success: true, doctors });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//api to get all appointments list 
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        console.log('Appointment Object:', appointments);
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


// api for appointment cancellation 
const appointmentCancel = async (req, res) => {
    try {
        const {  appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ sucess: false, message: "No appointment found" });
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

//aPI for dashboard statistics
// const dashboardStatistics = async (req, res) => {
//     try {
//         const totalDoctors = await doctorModel.find({});
//         const totalUsers = await userModel.find({});
//         const totalAppointments = await appointmentModel.find({});
        
//         const doctorsData = {
//             totalDoctors: totalDoctors.length,
//             totalUsers: totalUsers.length,
//             totalAppointments: totalAppointments.length,
//             latestAppointments: totalAppointments.slice(0,5).reverse(),

//         }

//         res.status(200).json({
//             success: true,
//             doctorsData,
//             message: "Dashboard statistics fetched successfully"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }
const dashboardStatistics = async (req, res) => {
    try {
        const totalDoctors = await doctorModel.find({});
        const totalUsers = await userModel.find({});
        const totalAppointments = await appointmentModel.find({})
            .populate('patientId', 'name')   // populate patient name
            .populate('doctorId', 'name');   // populate doctor name

        const doctorsData = {
            totalDoctors: totalDoctors.length,
            totalUsers: totalUsers.length,
            totalAppointments: totalAppointments.length,
            latestAppointments: totalAppointments.slice(0, 5).reverse(), // latest 5
        };

        res.status(200).json({
            success: true,
            doctorsData,
            message: "Dashboard statistics fetched successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export { addDoctor, adminLogin, getAllDoctors ,appointmentsAdmin,appointmentCancel,dashboardStatistics}; 
