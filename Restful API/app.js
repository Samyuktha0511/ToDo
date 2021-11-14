const express = require('express');
require("./config/database").connect();
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');
const upload = require("./middleware/upload");
const Grid = require("gridfs-stream");

//Middlewares - sorta function calls for a particular page/route
app.use(bodyParser.json());


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
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

let gfs;
const connection = mongoose.connection;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    if(gfs){console.log("Grid connection established successfully")};
})

app.get("/files", async (req, res) => {
    try {
       /* const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res); */

        gfs.files.find().toArray((err, files) => {
            res.status(200).json(files);
            /*
            if (!files || files.length == 0) {
                return res.status(200).json({
                    success: false,
                    message: "no files"
                })
            }
            res.status(200).json({
                success:true,
                files
            });
            */
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

//Right way to do it:
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

const usersRouter = require('./routes/users');
const { Store } = require('express-session');
app.use('/account/',usersRouter);

//listening
app.listen(3000);

module.exports = app;