const express = require('express');
const resetPasswordHandler = require('../controllers/resetPassword');

const router = express.Router();

// first request to handle the email for pass reset
router.post('/reset-password', resetPasswordHandler.resetPasswordHandler);

// check the token for password reset
router.get('/check-token', resetPasswordHandler.checkToken);

// update the password
router.post('/password-update', resetPasswordHandler.modifyPassword);

module.exports = router;