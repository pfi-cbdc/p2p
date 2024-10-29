const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log the received data
        const newInvoice = new Invoice({
            fileUpload: req.file.path, // Save the file path
            typeOfBusiness: req.body.typeOfBusiness,
            tenureOfInvoice: req.body.tenureOfInvoice,
            interestRate: req.body.interestRate
        });
        await newInvoice.save();
        res.status(201).json({ message: 'Invoice Submitted' });
    } catch (error) {
        console.error('Error creating invoice:', error); // Log the error
        res.status(400).json({ message: 'Error creating invoice', error });
    }
});

module.exports = router;