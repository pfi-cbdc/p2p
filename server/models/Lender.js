// server/models/Lender.js
const mongoose = require('mongoose');

const lenderSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    panCard: { type: String },
    dateOfBirth: { type: Date, required: true },
    employmentStatus: { type: String, required: true },
    gstNumber: { type: String },
    annualTurnover: { type: Number, required: true }
});

module.exports = mongoose.model('Lender', lenderSchema);

