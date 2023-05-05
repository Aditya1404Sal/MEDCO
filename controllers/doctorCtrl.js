const doctorModel = require("../models/doctorModel");

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

const getDoctorByIdCtrl = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            message:'successfully sent doctor details to booking page',
            success:true,
            data:doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'something went wrong in get single doc ctrl by id',
            success:false,
            error
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

module.exports = {getInfoDoctorCtrl , updateDocInfoCtrl,getDoctorByIdCtrl};