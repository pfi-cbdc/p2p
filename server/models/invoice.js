const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    fileUpload: { type: String },
    typeOfBusiness: { type: String, enum: ['Select', 'Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited'] },
    tenureOfInvoice: { type: Number },
    interestRate: { type: Number }
});

module.exports = mongoose.model('Invoice', invoiceSchema);