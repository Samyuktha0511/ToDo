const express = require('express');
require("./config/database").connect();
const app = express();
const bodyParser = require('body-parser')


//Middlewares - sorta function calls for a particular page/route
app.use(bodyParser.json());
/*
app.use('/tasks', () =>{
    console.log("This is a middleware running");
})
*/


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

const usersRouter = require('./routes/users');
app.use('/account/',usersRouter);

//listening
app.listen(3000);

module.exports = app;