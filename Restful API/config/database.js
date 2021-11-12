const mongoose = require('mongoose');
require('dotenv').config();


//MongoDB connection uname=pword=samyuktha
/*
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { });
*/

exports.connect = () => {
    mongoose.connect(process.env.ATLAS_URI, {});
}

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})
