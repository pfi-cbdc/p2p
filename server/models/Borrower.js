// server/models/Borrower.js
const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    panCard: { type: String },
    dateOfBirth: { type: Date, required: true },
    employmentStatus: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    loanPurpose: { type: String, required: true },
    annualIncome: { type: Number, required: true }
});

module.exports = mongoose.model('Borrower', borrowerSchema);

