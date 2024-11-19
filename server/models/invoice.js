const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    fileUpload: { type: String },
    typeOfBusiness: { type: String, enum: ['Select', 'Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited'] },
    tenureOfInvoice: { type: Number },
    interestRate: { type: Number },
    // firstName: { type: String, required: true },
    // email: { type: String, required: true },
    borrowerID: {type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true, unique: true},
    borrowedFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'Lender', unique: true},
    closed: { type: Boolean, default: false },
    verified: { type: Number, required: true, default: 0} // 0 - pending, 1 - accepted, 2 - rejected
});

module.exports = mongoose.model('Invoice', invoiceSchema);