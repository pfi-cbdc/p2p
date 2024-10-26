const express = require('express');
const { registerUser, loginUser, verifyOtp, sendOtp, logoutUser } = require('../controllers/authController');

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

module.exports = router;
