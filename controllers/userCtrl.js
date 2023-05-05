const {userModel} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');

const LoginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){//check for user
            return res.status(200).send({message:'User Does not Exist'});   
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)//user entered password is compared with decrypted hashed password from db
        if(!isMatch){
            return res.status(200).send({message:'invalid email or password'});
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({message:'Login successful',success:true,token});

    } catch (error) {
        console.log(error)
        res.status(500).send({message:`Login Controller ${error.message}`})
    }


} 


const authController = async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({message:'user not found',success:false});
        }
        else{
            res.status(200).send({
                success:true,
                data:user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'auth controller error',success:false})
    }
}

const RegisterController = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email}) 
        //searches the mongoDB database for email , to ensure that duplicate user does not exist.
        if(existingUser){
            return res.status(200).send({message:'user already exists',success:false})
        }
        const mobile_number = await userModel.findOne({mobile:req.body.mobile})
        if(mobile_number){
            return res.status(200).send({message:'Mobile Number already in use',success:false})
        }
        //password encryption 
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        //replacing entered password with encrypted password
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(200).send({message:'Registered successfully',success:true});

    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message:`Register Controller ${error.message}`})
    }

};

const applyDocController = async(req,res) =>{
    try {
        const newDoctor = await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'applied-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} Has applied for a Doctor Account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:'doctor account applied Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while applying for Doctor(location:userctrl)'
        })
    }
}

const getAllNotificationCtrl = async(req,res) => {
    try {
        
        const user = await userModel.findById({_id:req.body.userId})
        const seenNotification = await user.seenNotification
        const notification = await user.notification
        seenNotification.push(...notification)
        user.notification = [];
        user.seenNotification = notification
        const updatedUser = await user.save();
        res.status(200).send({
            message:'All notification Marked as read',
            success: true,
            data:updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all notifications'
        })
    }
};

const deleteAllNotificationCtrl = async(req,res) =>{
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.seenNotification = [];
        user.notification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            message: 'notification successfully deleted',
            success:true,
            data:updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'something went wrong in usercontroller',
            success:false,
            error,
        })
    }
}

const getAllDoctorCtrlUser = async(req,res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'});
        res.status(200).send({
            message:'succesfully got details of all doctors',
            success:true,
            data:doctors,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error is getting all doctor information',
            success:false,
            error,
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



module.exports = {LoginController,bookAppointmentCtrl,RegisterController,authController,applyDocController,getAllNotificationCtrl,getAllDoctorCtrlUser,deleteAllNotificationCtrl};