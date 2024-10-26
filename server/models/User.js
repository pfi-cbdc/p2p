const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensure phone is unique across users
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpiration: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
