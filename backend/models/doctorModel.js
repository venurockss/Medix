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
    available: {type : Boolean,default : true},
    fee: {type : Number, required : true},
    // address: {type : Object, required : true},
    address: {
        line1: { type: String, required: true },
        line2: { type: String, required: true }
    },
    date: {type : Number, required : true},
    slots_booked: {type : Object,default:{}},
},{minimize:false})


const doctorModel =  mongoose.model('docter',doctorSchmea)

export default doctorModel;