const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

require('dotenv').config();

//Middlewares - sorta function calls for a particular page/route
app.use(bodyParser.json());
/*
app.use('/tasks', () =>{
    console.log("This is a middleware running");
})
*/



//MongoDB connection uname=pword=samyuktha
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})



//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the great karikalan circus');
});

/*one way to do it:
app.get('/tasks', (req, res) => {
    res.send('These are the tasks');
});
*/
//Right way to do it:
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

//listening
app.listen(3000);