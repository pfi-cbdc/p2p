const nodemailer = require('nodemailer');

// Transporter for sending email
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
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
        //console.log(`Sending OTP to: ${email}`); // Debug log
        await transporter.sendMail(mailOptions);
        //console.log('OTP sent to email successfully'); // Debug log
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
    }
};

const sendBorrowerPaymentEmail = async (email, amount) => {
    const subject = 'Payment Received';
    const message = `Your account has been credited with ₹${amount}. Please goto the p-fi website to check the details.`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.error('Error sending payment email:', error.message);
    }
};

const sendBorrowerStatusEmail = async (email, firstName, status) => {
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
        //console.log(`Attempting to send email to ${email}...`); // Debug log
        await transporter.sendMail(mailOptions);
        //console.log('Application status email sent successfully');
    } catch (error) {
        //console.error('Error sending application status email:', error.message); // Improved error logging
    }
};

// Function to send Invoice Status Email
const sendInvoiceStatusEmail = async (email, firstName, status) => {
    const subject = status === 1 
        ? 'Your Invoice has been Approved' 
        : 'Your Invoice has been Rejected';

    const message = status === 1 
        ? `Dear ${firstName},\n\nYour invoice has been approved. Thank you!`
        : `Dear ${firstName},\n\nWe regret to inform you that your invoice has been rejected.`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending invoice status email:', error.message);
    }
};

// Function to send Lender Status Email
const sendLenderStatusEmail = async (email, firstName, status) => {
    const subject = status === 1 
        ? 'Your Lender Application has been Accepted' 
        : 'Your Lender Application has been Rejected';

    const message = status === 1 
        ? `Dear ${firstName},\n\nYour lender application has been accepted. Welcome aboard!`
        : `Dear ${firstName},\n\nWe regret to inform you that your lender application has been rejected.`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending lender status email:', error.message);
    }
};

// Function to send Investment Status Email
const sendInvestmentStatusEmail = async (email, firstName, status) => {
    const subject = status === 1 
        ? 'Your Investment has been Accepted' 
        : 'Your Investment has been Rejected';

    const message = status === 1 
        ? `Dear ${firstName},\n\nYour investment has been accepted. Thank you for your trust!`
        : `Dear ${firstName},\n\nWe regret to inform you that your investment has been rejected.`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending investment status email:', error.message);
    }
};

module.exports = {
    transporter,
    sendOtpToMail,
    sendBorrowerStatusEmail,
    sendInvoiceStatusEmail,
    sendLenderStatusEmail,
    sendInvestmentStatusEmail,
    sendBorrowerPaymentEmail
};
