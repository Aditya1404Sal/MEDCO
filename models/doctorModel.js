const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    firstName: {
        type: String,
        required: [true,"first name is required"],
    },
    lastName:{
        type: String,
        required: [true,"last name is required"],
    },
    phone: {
        type:String,
        required:[true,"phone number is required"],
    },
    email: {
        type:String,
        required:[true,"email is required"],
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    appointments:{
        type:Array,
        required:false,
        default:0
    },
    specialization:{
        type:String,
        required:[true,"specialization is required"]
    },
    experience:{
        type:String,
        required:[true,"experience is required"]
    },
    consultationFee:{
        type:Number,
        required:[true,"consultation fee is required"]
    },
    NumberOfpatient:{
        type:Number,
        required:[true,"number of patients required"],
        default:0
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true,"work timings are required"]
    }

},
{timestamps:true}
);

const doctorModel = mongoose.model('doctors',doctorSchema);
module.exports = doctorModel;