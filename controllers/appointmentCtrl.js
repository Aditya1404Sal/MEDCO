const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel')
const moment = require('moment');
const { userModel } = require('../models/userModel');



const getAllAppointmentsForUser = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({userId:req.body.userId});
        res.status(200).send({
            message:'successfully got all the appointments booked by user',
            success:true,
            data:appointments,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in appointment ctrl',
            success:false,
            error,
        })
    }
}

const checkAppointmentAvailability = async(req,res) =>{
try {
    const date = moment(req.body.appointmentDate,'DD-MM-YYYY').toISOString();
    const fromTime = moment(req.body.appointmentTime,'HH:mm').subtract(1,'hours').toISOString();
    const toTime = moment(req.body.appointmentTime,'HH:mm').add(1,'hours').toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({doctorId,
    date,
    appointmentTime:{
        $gte:fromTime , $lte:toTime
    }
    })

    if(appointments.length > 0){
        return res.status(200).send({
            message:'Appointment is not available at this time',
            success:true
        })
    }else{
        return res.status(200).send({
            success:true,
            message:'Appointment Available'
        })
    }
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        message:'error checking for booking availability',
        success:false,
        error
    })
}
}

const bookAppointmentCtrl = async(req,res) => {
    try {
        req.body.appointmentDate = moment(req.body.appointmentDate,'DD-MM-YYYY').toISOString();
        req.body.appointmentTime = moment(req.body.appointmentTime,'HH:mm').toISOString();
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save();
        const user = await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            message:`new appointment reserved by ${req.body.userInfo.name} for ${req.body.appointmentDate} time: ${req.body.appointmentTime}`,
            type:'new-appointment-request',
            onClickPath:'/user/appointments'
        })
        await user.save();
        res.status(200).send({
            message:'Appointment Booked successfully',
            success:true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in book appointment ctrl pipeline',
            success:false,
            error,
        })
    }
}

const getUserDataForPatients = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports = {getAllAppointmentsForUser,getUserDataForPatients,checkAppointmentAvailability,bookAppointmentCtrl}; 