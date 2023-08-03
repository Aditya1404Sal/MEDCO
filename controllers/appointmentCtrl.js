const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel')
const moment = require('moment');
const { userModel } = require('../models/userModel');

const getAllPatientDataCtrl = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId});//change to approved once payment gate-way integration hits singularity
        const patients = await appointmentModel.find({
            doctorId:doctor._id
        })
        res.status(200).send({
            success:true,
            message:'Got all appointments of users',
            data:patients
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in appointment ctrl ',
            success:false,
            error,     
        });
    }
}

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

module.exports = {getAllPatientDataCtrl,getAllAppointmentsForUser,checkAppointmentAvailability,}; 