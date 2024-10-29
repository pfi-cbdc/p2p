// server/routes/lender.js
const express = require('express');
const router = express.Router();
const Lender = require('../models/Lender');
const addInvestments = require('../controllers/Investments');

// POST route to create a new lender
router.post('/', async (req, res) => {
    try {
        const newLender = new Lender(req.body);
        await newLender.save();
        res.status(201).json({ message: 'Lender created successfully', lender: newLender });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        // Return specific error messages
        res.status(400).json({ message: 'Error creating lender', error: error.message });
    }
});

// POST route to add a new Investment
// router.post('/newInv', authMiddleware, addInvestments);
router.post('/newInv', addInvestments);

module.exports = router;
