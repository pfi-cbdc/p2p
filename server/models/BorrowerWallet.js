const mongoose = require('mongoose');

const borrowerWalletSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
    balance: { type: Number, default: 500 }, 
    transactions: [{ 
        amount: { type: Number, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        date: { type: Date, default: Date.now }
    }]
});

borrowerWalletSchema.methods.addAmount = async function(amount) {
    this.balance += amount;
    this.transactions.push({ amount, type: 'credit' }); 
    await this.save();
};

module.exports = mongoose.model('BorrowerWallet', borrowerWalletSchema); 