const express = require('express');
require("./config/database").connect();
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Middlewares - sorta function calls for a particular page/route
app.use(bodyParser.json());


app.use(session({
    secret: 'keyboard cat',
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI })
}));  
/*
app.use('/tasks', () =>{
    console.log("This is a middleware running");
})
*/


//Routes
app.get('/', (req, res) => {
    res.send('Productivity manager homepage');
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
const { Store } = require('express-session');
app.use('/account/',usersRouter);

//listening
app.listen(3000);

module.exports = app;