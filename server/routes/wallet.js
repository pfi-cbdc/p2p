const express = require('express');
const router = express.Router();
const LenderWallet = require('../models/LenderWallet');
const BorrowerWallet = require('../models/BorrowerWallet');

router.post('/transfer', async (req, res) => {
    const { lenderId, borrowerId, amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    const session = await LenderWallet.startSession();
    session.startTransaction();

    try {
        const lenderWallet = await LenderWallet.findOne({ userID: lenderId }).session(session);
        const borrowerWallet = await BorrowerWallet.findOne({ userID: borrowerId }).session(session);

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


router.get('/lender/:id', async (req, res) => {
    try {
        const lenderWallet = await LenderWallet.findOne({ userID: req.params.id });
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

router.get('/borrower/:id', async (req, res) => {
    try {
        const borrowerWallet = await BorrowerWallet.findOne({ userID: req.params.id });
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