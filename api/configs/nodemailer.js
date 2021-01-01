const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILSEVER_ID,
        pass: process.env.MAILSEVER_PASS
    }
});

module.exports = transporter;