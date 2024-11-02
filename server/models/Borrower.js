const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    aadharCard: [{ type: String }],
    panCard: [{ type: String }],
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date, required: true },
    accountStatement: [{ type: String }],
    gstNumber: { type: String, required: true },
    typeOfBusiness: { type: String, required: true, enum: ['test1', 'test2', 'test3', 'test4', 'test5'] },
    email: { type: String, required: true, unique: true } // Add email field
});

module.exports = mongoose.model('Borrower', borrowerSchema);
