const express = require('express');
const { loginAdmin, addAdmin, logoutAdmin, verifyOTP } = require('../controllers/adminLogin');
const { getDetails } = require('../controllers/adminDetails');
const { isAdmin } = require('../Middlewares/adminAuth');

const router = express.Router();

// Route for admin login
router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOTP);

// Route for admin register
// router.post('/register', addAdmin);

//route for admin logout
router.post('/logout' ,logoutAdmin);

// Route for details on the admin dashboard
router.get('/dashboard' ,getDetails);

// Route to verify admin
router.post('/me', isAdmin);

module.exports = router;