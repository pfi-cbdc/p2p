// server/models/Lender.js
const mongoose = require('mongoose');

const lenderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    aadharCard: [{ type: String, required: true }],
    panCard: [{ type: String, required: true }],
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date, required: true },
    accountStatement: [{ type: String, required: true }],
    gstNumber: { type: String, required: true },
    employmentStatus: { type: String, required: true, enum: ['self-employed', 'salaried', 'business'] },
    email: { type: String, required: true, unique: true } // Add email field
});

module.exports = mongoose.model('Lender', lenderSchema);
