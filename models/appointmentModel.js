const mongoose = require('mongoose');
// const doctorModel = require('./doctorModel'); //try it out with either the schema or model
// const  userModel = require('./userModel');
const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    appointmentId:{
        type:String,
        required:true
    },
    doctorInfo:{
        type:Object,
        required:true,
    },
    userInfo:{
        type:Object,
        required:true,
    },
    appointmentDate:{
        type:Object,
        required:true
    },
    appointmentTime:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    paymentStatus:{
        type:String,
        required:true,
        default:'pending'
    },
    isBooked:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamps:true})
const appointmentModel = mongoose.model('appointments',appointmentSchema);
module.exports = appointmentModel;