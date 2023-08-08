const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

const getInfoDoctorCtrl = async(req,res) => {
    try {

        const doctor = await doctorModel.findOne({userId:req.body.userId});
        res.status(200).send({
            success:true,
            message:'Got Doctor info',
            data:doctor
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in getting doctor information',
            success:false,
            error,
        })
    }
}

const updatePatientCtrl = async(req,res) => {
    try {
    const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body.NumberOfpatient);
    res.status(200).send({
        success:true,
        message:'number of patients changed',
        data:doctor.NumberOfpatient,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'something went wrong in update patient no ctrl',
            success:false,
            error
        })
    }
}

const deleteAllPatientCtrl = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        doctor.NumberOfpatient = 0;
        const updatedDoctor = await doctor.save();
        res.status(200).send({
            message:'number of patients reset to zero',
            success:true,
            data:updatedDoctor,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'something went wrong in 65:doctorctrl.js',
            error,
            success:false
        })
    }
}

const updateDocInfoCtrl = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body);
        res.status(200).send({
            success:true,
            message:'updated Doctor info',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in updating doctors info',
            success: false,
            error,
        })
    }
}

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

module.exports = {getAllPatientDataCtrl, getInfoDoctorCtrl , updateDocInfoCtrl,updatePatientCtrl,deleteAllPatientCtrl};