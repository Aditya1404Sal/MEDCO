const doctorModel = require("../models/doctorModel");
const  userModel  = require("../models/userModel");


const getAllDoctorController = async(req,res) => {
    try {

        const doctors = await doctorModel.find({});
        res.status(200).send({
            success:true,
            message:'successfully got details of all doctors',
            data:doctors
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in getalldoccontroller',
            success:false,
            error
        })
    }
}

const getAllUserController = async(req,res) => {
    try {

        const users = await userModel.find({});
        res.status(200).send({
            success:true,
            message:'successfully got details of all users',
            data:users
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in getalluserontroller',
            success:false,
            error,
        })
    }
}


const accountStatusChangeController = async(req,res) => {
    try {
        const {doctorId , status} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification;
        notification.push({
            type:'doc-account-request-updated',
            message:`Your Doctor Account Request has been ${status}`,
            onClickPath: '/notifications'
        })
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
            message:'Account Status Has been changed',
            success:true,
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'error in admin ctrl',
            success: false,
            error,
        })
    }
}

module.exports = {getAllDoctorController,getAllUserController,accountStatusChangeController};