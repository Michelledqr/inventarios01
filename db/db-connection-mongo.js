const mongoose = require('mongoose');
const dotenv= require('dotenv').config();

const getConnection = async () => {
    try{
        const url = process.env.DB_MONGO;
        await mongoose.connect(url);
        console.log('Mongodb is connected!');
    } catch (error) {
        console.log(error);
    }
}

//module.exports = {getConnection}
// or 
exports.getConnection = getConnection