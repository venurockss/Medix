import bcrypt from 'bcryptjs';
import Validator from 'validator';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from "cloudinary";
const registerUser = async(req,res) => {
   try {
    //  const {name,email,password} = req.body;
    const { name, email: rawEmail, password } = req.body;
const email = rawEmail?.trim().toLowerCase();


     if( !name || !email || !password){
           return res.json({sucess:false,message:"Please enter all fields"});
     }
     
     if(!Validator.isEmail(email)){
           return res.json({sucess:false,message:"Invalid Email"});
     }

     if(password.length < 8){
           return res.json({sucess:false,message:"Password must be atleast 8 characters"});
     }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password,salt);


        const userData = {
            name,
            email,
            password:hash
        };

        const user = new userModel(userData);
        const newUser = await user.save();
          
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        res.json({sucess:true,token,user:newUser});
        
   } catch (error) {
         
         res.json({sucess:false,message:error.message});
   }
}

const loginUser = async(req,res) => {
    try {
        const {password} = req.body;
        const email = req.body.email?.trim().toLowerCase();

        if(!email || !password){
            return res.json({sucess:false,message:"Please enter all fields"});
        }
        const user = await userModel.findOne({email});
        console.log("Looking for user with email:", email);

        if(!user){
            return res.json({sucess:false,message:"user not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
           
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.json({sucess:true,token,user});
        }

        else{
            return res.json({sucess:false,message:"Invalid Credentials"});
        }



    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}

//api for getting user data
const gettingUserData = async(req,res) => {
    try {
        const {userId} = req.body;
        console.log("Fetching user data for userId:", userId);
        if(!userId){
            return res.json({sucess:false,message:"Please enter all fields"});
        }
        const user = await userModel.findById(userId).select("-password");
        console.log("Database query result for user:", user);
         res.json({sucess:true,user});
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}

//api for updating user data
const updateUserData = async(req,res) => {
    try {
        const {userId,name,phone,gender,address,dob} = req.body;
        const imagefile = req.file;
        if(!name || !phone || !gender || !address || !dob){
            return res.json({sucess:false,message:"Please enter all fields"});
        }
        await userModel.findByIdAndUpdate(userId,{
            name,
            phone,
            address:JSON.parse(address),
            dob,
            gender

        })
        if(imagefile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imagefile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({sucess:true,message:"sucesfully updated"})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
        
    }
}


export {registerUser,loginUser,gettingUserData,updateUserData};