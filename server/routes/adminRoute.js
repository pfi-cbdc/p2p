const express = require('express');
const { loginAdmin, addAdmin, logoutAdmin, verifyOTP } = require('../controllers/adminLogin');
const { getDetails, checkUser } = require('../controllers/adminDetails');
const { isAdmin } = require('../Middlewares/adminAuth');

const router = express.Router();

// Route for admin login
router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOTP);

// Route for admin register
// router.post('/register', addAdmin);

//route for admin logout
router.post('/logout', isAdmin, logoutAdmin);

// Route for details on the admin dashboard
router.post('/dashboard', isAdmin, getDetails);

// Route to verify admin
router.post('/me', isAdmin, (req, res)=> {
    res.status(200).json({message: "Go bro GO."});
});

// Route to verify the user
router.post('/verify-user', checkUser);

module.exports = router;