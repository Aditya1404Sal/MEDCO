const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() =>{ 
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB server connected to ${mongoose.connection.host}`.bgCyan.black);
    } catch (error) {
        console.log(`MongoDB server issue: ${error}`.bgRed.black);
    }
}

module.exports = connectDB;
//establishes connection with mongoDB 