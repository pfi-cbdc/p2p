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
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Number, required: true, default: 0} // 0 - pending, 1 - accepted, 2 - rejected
});

module.exports = mongoose.model('Investment', InvestmentSchema);