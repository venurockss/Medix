import mongoose from "mongoose";

const doctorSchmea = new mongoose.Schema({
    name: {type : String, required : true},
    email: {type : String, required : true,unique : true},
    password: {type : String, required : true},
    image: {type : String},
    speciality: {type : String, required : true},
    degree: {type : String, required : true},
    experience: {type : String, required : true},
    about: {type : String, required : true},
    available: {type : Boolean, required : true},
    fee: {type : Number, required : true},
    address: {type : Object, required : true},
    date: {type : Number, required : true},
    slots_booked: {type : Object,default:{}},
},{minimize:false})


const doctorModel = mongoose.models.docter || mongoose.model('docker',doctorSchmea)

export default doctorModel;