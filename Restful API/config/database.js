const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
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
let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    //gfs.collection("users");
    console.log("MongoDB connection established successfully");
})

