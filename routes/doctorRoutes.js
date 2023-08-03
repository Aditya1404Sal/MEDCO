const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getInfoDoctorCtrl, updateDocInfoCtrl, getDoctorByIdCtrl, updatePatientCtrl, deleteAllPatientCtrl } = require('../controllers/doctorCtrl');
const { getAllPatientDataCtrl } = require('../controllers/appointmentCtrl');
const router = express.Router();

//POST this will fetch single Doctor Details
router.post('/getInfoDoctor',authMiddleware,getInfoDoctorCtrl);

//POST this will update Doctor details
router.post('/updateDocInfo',authMiddleware,updateDocInfoCtrl);

//POST method specifically for gatting doctor details based on params-id
router.post('/getDoctorById',authMiddleware,getDoctorByIdCtrl);

//managing number of patients in thee clinics 

router.post('/addPatientInClinic',authMiddleware,updatePatientCtrl);

//POST method for displaying *all* users with appointments affiliated with a doctor of params-id

router.post('/getAllPatientsData' , authMiddleware , getAllPatientDataCtrl);

//

router.post('/delete-all-patient-number',authMiddleware,deleteAllPatientCtrl);

//POST method for a double (/params_for_doctor/params_for_specific patient) info retrieval api

module.exports = router;
