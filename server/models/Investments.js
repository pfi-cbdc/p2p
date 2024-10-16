//  server/models/Invesments.js
const mongoose  = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        required: true
    },
    monthlyEarnings: {
        type: String,
        required: true
    },
    lenderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Lender"
    }
});

module.exports = mongoose.model('Investments', InvestmentSchema);