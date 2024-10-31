// server/routes/borrower.js
const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');

// POST route to create a new borrower
router.post('/', async (req, res) => {
    try {
        const newBorrower = new Borrower(req.body);
        await newBorrower.save();
        res.status(201).json({ message: 'Borrower created successfully', borrower: newBorrower });
    } catch (error) {
        res.status(400).json({ message: 'Error creating borrower', error });
    }
});

module.exports = router;

// Route to check borrower status
router.get('/status', async (req, res) => {
    const { email } = req.query;
    try {
        const borrower = await Borrower.findOne({ email });
        if (borrower) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error checking borrower status', error: error.message });
    }
});