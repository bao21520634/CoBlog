const nodemailer = require("nodemailer");
require("dotenv").config();

exports.generateOTP = () => {
    let otp = "";
    for (let i = 0; i <= 3; i++) {
        const rand = Math.round(Math.random() * 9);
        otp += rand;
    }
    return otp;
};

exports.mailTransport = () =>
    nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_AUTH_KEY,
        },
    });
