// server/routes/lender.js
const express = require('express');
const router = express.Router();
const Lender = require('../models/Lender');

// POST route to create a new lender
router.post('/', async (req, res) => {
    try {
        const newLender = new Lender(req.body);
        await newLender.save();
        res.status(201).json({ message: 'Lender created successfully', lender: newLender });
    } catch (error) {
        res.status(400).json({ message: 'Error creating lender', error });
    }
});

module.exports = router;

