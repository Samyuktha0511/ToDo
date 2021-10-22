const router = require('express').Router();
const User = require('../models/userModel');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { body, validationResult } = require('express-validator');

router.post('/register',
  body('email').isEmail().custom(value => {
    return User.findOne({email: value}).then(user => {
      if(user) {
        return Promise.reject('Email exists already');
      }
    });
  }),
  body('password').isLength({ min: 5}),
  async (req, res) => {
      //find validation err, send it out as an object
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        console.log({errors: errors.array()});
        return res.status(400).json({ errors: errors.array()});
      }

      // register logic
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    //const oldUser = await User.findOne({ email });

    //if (oldUser) {
    //  return res.status(409).send("User Already Exist. Please Login");
    //}

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

module.exports = router;