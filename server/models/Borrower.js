const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    aadharCard: { type: String, required: true },
    panCard: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date, required: true },
    accountStatement: { type: String, required: true },
    gstNumber: { type: String, required: true },
    typeOfBusiness: { type: String, required: true, enum: ['test1', 'test2', 'test3', 'test4', 'test5'] }, // Replace employmentStatus with typeOfBusiness
    email: { type: String, required: true, unique: true } // Add email field
});

module.exports = mongoose.model('Borrower', borrowerSchema);
