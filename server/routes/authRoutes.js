const express = require('express');
const { registerUser, loginUser, verifyOtp, sendOtp, logoutUser } = require('../controllers/authController');
const User = require('../models/User'); // Import User model
const Lender = require('../models/Lender'); // Import Lender model
const Borrower = require('../models/Borrower'); // Import Borrower model

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for OTP verification
router.post('/verify-otp', verifyOtp);

// Route for user login
router.post('/login', loginUser);

// Optional: Route for sending OTP (in case of re-sending OTP)
router.post('/send-otp', sendOtp);

// Route for user logout
router.post('/logout', logoutUser);

/// New route to check if user exists
router.get('/check-user/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const isLender = await Lender.findOne({ email });
        const isBorrower = await Borrower.findOne({ email });
        res.status(200).json({ isLender: !!isLender, isBorrower: !!isBorrower });
    } catch (error) {
        res.status(500).json({ message: 'Error checking user', error });
    }
});


// Fetch all users for admin dashboard
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
