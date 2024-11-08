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
        console.error('Error sending OTP email:', error.message); // Improved error logging
        // Optionally, you can throw the error or handle it as needed
    }
};

const sendApplicationStatusEmail = async (email, firstName, status) => {
    const subject = status === 1 
        ? 'Your Borrower Application has been Accepted' 
        : 'Your Borrower Application has been Rejected';

    const message = status === 1 
        ? `Dear ${firstName},\n\nYour application has been accepted. Welcome aboard!`
        : `Dear ${firstName},\n\nWe regret to inform you that your application has been rejected.`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    try {
        console.log(`Attempting to send email to ${email}...`); // Debug log
        await transporter.sendMail(mailOptions);
        console.log('Application status email sent successfully');
    } catch (error) {
        console.error('Error sending application status email:', error.message); // Improved error logging
    }
};

// Export both transporter and sendOtpToMail
module.exports = {
    transporter,
    sendOtpToMail,
    sendApplicationStatusEmail,
};
