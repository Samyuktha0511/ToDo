var nodemailer = require('nodemailer')
require('dotenv').config();

const sendMail = (email, id) => {
    //resuable transporter object using default SMTP transport
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAILEREMAIL,
            pass: process.env.MAILERPASSWORD
        }
    });

    //email data, unicode symbols
    let sender = "Samyuktha";
    var mailOptions = {
        from: sender,
        to: email,
        subject: "Email confirmation",
        html: `Press <a href=http://localhost:3000/verfiy/${id}> here </a> to verify your email`
    }

    //use transport object to send mail
    Transport.sendMail(mailOptions, function(err, res) {
        if (err){
            console.log(err);
        }
        else{
            console.log("message sent");
        }
    })
}

module.exports = sendMail;