const express = require('express');
const { LoginController, RegisterController, authController ,applyDocController,getAllNotificationCtrl,deleteAllNotificationCtrl, getAllDoctorCtrlUser, bookAppointmentCtrl} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllAppointmentsForUser, checkAppointmentAvailability, getUserDataForPatients } = require('../controllers/appointmentCtrl');

//router

const router = express.Router();

//routes

//login
router.post('/Login' , LoginController);

//register
router.post('/Register' , RegisterController);

//notification doctor
router.post('/get-all-notification',authMiddleware,getAllNotificationCtrl)

router.post('/delete-all-notification',authMiddleware,deleteAllNotificationCtrl)

// Send Booking data to database as pending controller
router.post('/book-appointment',authMiddleware,bookAppointmentCtrl)

//Apply as a doctor

router.post("/apply-doctor",authMiddleware,applyDocController);

//Auth
router.post('/getUserData',authMiddleware,authController);

//GET all doctors on homepages

router.get('/getAllDoctors',authMiddleware,getAllDoctorCtrlUser);

//GET all the appointments of a user on the appointments page
router.get('/getUserAppointments',authMiddleware,getAllAppointmentsForUser);

//check availability of appointment for the "check button"

router.post('/checkAppointmentAvailable',authMiddleware,checkAppointmentAvailability);

module.exports = router;