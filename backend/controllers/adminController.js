import validator from 'validator';
import bycrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// api for adding dcotor
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, speciality,degree,experience,about,fee,address} = req.body;
        // const imageFile = req.file; 
        console.log("REQ BODY:", req.body);

        if(!name || !email || !password || !speciality || !degree || !experience || !about || fee === undefined || !address ){
            return res.status(400).json({success:false,message:"All fields are required"});
        }

        if(validator.isEmail(email) === false){
            return res.status(400).json({success:false,message:"Invalid email"});
        }
        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password must be atleast 6 characters"});
        }
        //hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        //image uploading
        // const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        // const imageUrl = imageUpload.secure_url;


        const doctorData = {
            name,
            email,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            date:Date.now(),
            address:address,
            // image :imageUrl
        }
        const doctor = new doctorModel(doctorData);
        await doctor.save();
        res.status(201).json({success:true,message:"Doctor added successfully"});
        

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

//API for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password,process.env.JWT_SECRET);
           res.status(200).json({success:true,token});
        }
        else{
            res.status(400).json({success:false,message:"Invalid credentials"});
        }
    } catch (error) {
        
    }
}

export {addDoctor,adminLogin};