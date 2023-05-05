const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//dotenv config

dotenv.config();

//mongo db connection 

connectDB();

//rest object

const app = express();

//middlewares

app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/admin',require('./routes/adminRoutes'));
app.use('/api/v1/doctor',require('./routes/doctorRoutes'));
//port 

const port = process.env.PORT

//server listener 
app.listen(port,()=>{
    console.log(`server is running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgGreen.bgWhite);
});
//build react interface next 