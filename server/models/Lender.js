// server/models/Lender.js
const mongoose = require('mongoose');

const generateLenderId = () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase(); // Generates a 10-character alphanumeric string
};

const lenderSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    // firstName: { type: String, required: true },
    aadharCard: [{ type: String, required: true }],
    panCard: [{ type: String, required: true }],
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date, required: true },
    accountStatement: [{ type: String, required: true }],
    gstNumber: { type: String, required: true },
    employmentStatus: { type: String, required: true, enum: ['self-employed', 'salaried', 'business'] },
    // email: { type: String, required: true, unique: true }, // Add email field
    verified: { type: Number, required: true, default: 0}, // 0 - pending, 1 - accepted, 2 - rejected
    lenderId: { type: String, required: true, unique: true, default: generateLenderId } // New lenderId field
});

module.exports = mongoose.model('Lender', lenderSchema);
