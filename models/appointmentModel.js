const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    doctorInfo:{
        type:String,
        required:true,
    },
    userInfo:{
        type:String,
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