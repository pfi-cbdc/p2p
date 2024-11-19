const mongoose = require('mongoose');

const lenderWalletSchema = new mongoose.Schema({
    lenderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lender', required: true },
    balance: { type: Number, default: 500 }, 
    transactions: [{ 
        amount: { type: Number, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        date: { type: Date, default: Date.now }
    }]
});

lenderWalletSchema.methods.deductAmount = async function(amount) {
    if (this.balance >= amount) {
        this.balance -= amount;
        this.transactions.push({ amount, type: 'debit' }); 
        await this.save();
        return true;
    }
    return false; 
};

module.exports = mongoose.model('LenderWallet', lenderWalletSchema); 