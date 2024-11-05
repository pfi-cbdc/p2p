const nodemailer = require('nodemailer');

// Transporter for sending email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

exports.sendOtpToEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is ${otp}. This OTP is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email');
    } catch (error) {
        console.error('Error sending OTP email', error);
    }
};

module.exports = transporter;
