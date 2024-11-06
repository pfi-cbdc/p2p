const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload invoice and file to Cloudinary
router.post('/', upload.single('fileUpload'), async (req, res) => {
    try {
        // Convert file buffer to readable stream
        const stream = Readable.from(req.file.buffer);

        // Upload file to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'pfi' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.pipe(uploadStream);
        });

        // Save invoice details to database
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

router.put('/update', async (req, res) => {
    try{
        const {id, stat} = req.body;
        console.log(id);
        const invoice = await Invoice.findByIdAndUpdate(id, {$set: {verified: Number(stat)}});
        if(!invoice) {
            return res.status(400).json({message: "Error during update"});
        }
        return res.status(200).json({message: "All set!"});
    } catch(err) {
        return res.status(400).json({message: `${err}`});
    }
});

module.exports = router;
