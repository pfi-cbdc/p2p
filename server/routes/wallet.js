const express = require('express');
const router = express.Router();
const LenderWallet = require('../models/LenderWallet');
const BorrowerWallet = require('../models/BorrowerWallet');
const User = require('../models/User');
const Lender = require('../models/Lender');
const Borrower = require('../models/Borrower');

router.post('/transfer', async (req, res) => {
    const { email, borrowerId, amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    const session = await LenderWallet.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ email }).session(session); // Find user by email
        const lender = await Lender.findOne({ userID: user._id }).session(session); // Find lender by user ID
        let lenderWallet;
        if(lender) {
            lenderWallet = await LenderWallet.findOne({ lenderID: lender._id }).session(session); // Find lender wallet by lender ID
        }
        const borrowerWallet = await BorrowerWallet.findOne({ borrowerID: borrowerId }).session(session); // Find borrower wallet by borrower ID
        if (!lenderWallet || !borrowerWallet) {
            throw new Error('Wallet not found');
        }

        const deducted = await lenderWallet.deductAmount(amount);
        if (!deducted) {
            throw new Error('Insufficient balance');
        }

        await borrowerWallet.addAmount(amount);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Transaction successful' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error during wallet transaction:', error);
        return res.status(500).json({ message: error.message });
    }
});


router.get('/lender/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const lender = await Lender.findOne({ userID: user._id });
        const lenderWallet = await LenderWallet.findOne({ lenderID: lender._id });
        if (!lenderWallet) {
            return res.status(404).json({ message: 'Lender wallet not found' });
        }
        return res.status(200).json({
            balance: lenderWallet.balance,
            transactions: lenderWallet.transactions
        });
    } catch (error) {
        console.error('Error fetching lender wallet:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/borrower/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const borrower = await Borrower.findOne({ userID: user._id });
        const  borrowerWallet = await BorrowerWallet.findOne({ borrowerID: borrower._id });
        if (!borrowerWallet) {
            return res.status(404).json({ message: 'Borrower wallet not found' });
        }
        return res.status(200).json({
            balance: borrowerWallet.balance,
            transactions: borrowerWallet.transactions
        });
    } catch (error) {
        console.error('Error fetching borrower wallet:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;