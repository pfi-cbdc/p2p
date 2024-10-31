const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const cloudinary = require('../utils/cloudinaryConfig');

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log the received data

        // Upload file to Cloudinary in the 'pfi' folder
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'pfi' // Specify the folder name here
        });

        const newInvoice = new Invoice({
            fileUpload: result.secure_url, // Save the Cloudinary URL
            typeOfBusiness: req.body.typeOfBusiness,
            tenureOfInvoice: req.body.tenureOfInvoice,
            interestRate: req.body.interestRate,
            email: req.body.email, // Save email
            firstName: req.body.firstName // Save firstName
        });

        await newInvoice.save();
        res.status(201).json({ message: 'Invoice Submitted', fileUpload: result.secure_url });
    } catch (error) {
        console.error('Error creating invoice:', error); // Log the error
        res.status(400).json({ message: 'Error creating invoice', error });
    }
});

module.exports = router;