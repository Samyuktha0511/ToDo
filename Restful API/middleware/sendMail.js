var nodemailer = require('nodemailer')
require('dotenv').config();

const sendEmail = (email, id) => {
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
        html: `Press <a href=http://localhost:3000/account/verify/${id}> here </a> to verify your email`
    }

    //use transport object to send mail
    Transport.sendMail(mailOptions, function(err, res) {
        console.log(mailOptions.to);
        if (err){
            console.log(err);
        }
        else{
            console.log("message sent");
        }
    })
}

module.exports = sendEmail;