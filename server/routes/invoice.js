const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');

// Configure Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
const upload = multer();

// Upload invoice and file to Cloudinary
router.post('/', upload.single('fileUpload'), async(req, res) => {
    // console.log(req.file); // Log the uploaded file
    // console.log(req.body); // Log the other form fields
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'pfi' });
        const newInvoice = new Invoice({
            fileUpload: result.secure_url,
            typeOfBusiness: req.body.typeOfBusiness,
            tenureOfInvoice: req.body.tenureOfInvoice,
            interestRate: req.body.interestRate,
            firstName: req.body.firstName,
            email: req.body.email
        });

        await newInvoice.save();
        res.status(201).json({ message: 'Invoice Submitted', fileUpload: result.secure_url });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(400).json({ message: 'Error creating invoice', error });
    }
});

// Fetch all invoices for admin dashboard
router.get('/all', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(400).json({ message: 'Error fetching invoices', error });
    }
});

module.exports = router;
