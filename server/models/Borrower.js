const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    aadharCard: [{ type: String, required:true }],
    panCard: [{ type: String, required: true }],
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date, required: true },
    accountStatement: [{ type: String, required: true }],
    gstNumber: { type: String, required: true },
    typeOfBusiness: { type: String, required: true, enum: ['test1', 'test2', 'test3', 'test4', 'test5'] },
    email: { type: String, required: true, unique: true }, // Add email field
    verified: { type: Number, required: true, default: 0} // 0 - pending, 1 - accepted, 2 - rejected
});

module.exports = mongoose.model('Borrower', borrowerSchema);
