const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllDoctorController, getAllUserController, accountStatusChangeController } = require('../controllers/adminCtrl');

const router = express.Router();

//GET method for getting data of all users

router.get('/getAllUserData',authMiddleware,getAllUserController);

//GET method for getting data of all doctors

router.get('/getAllDoctorData',authMiddleware,getAllDoctorController);


//POST method for updating status 

router.post('/accountStatusChange',authMiddleware,accountStatusChangeController)


module.exports = router;