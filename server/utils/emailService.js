const nodemailer = require('nodemailer');

// Transporter for sending email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Function to send OTP to email
const sendOtpToMail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is ${otp}. This OTP is valid for 5 minutes.`,
    };

    try {
        console.log(`Sending OTP to: ${email}`); // Debug log
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email successfully'); // Debug log
    } catch (error) {
        console.error('Error sending OTP email:', error); // Improved error logging
    }
};

// Export both transporter and sendOtpToMail
module.exports = {
    transporter,
    sendOtpToMail,
};
