const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required "],
    },
    email: {
        type: String,
        required: [true, "email is required "],
    },
    password: {
        type: String,
        required: [true, "password is required "]
    },
    mobile: {
        type: String,
        required: [true, "mobile number is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[],
    },
    seenNotification:{
        type:Array,
        default:[]
    }

});
//the schema for the data to be sent to MongoDB
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;