const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');
const { sendInvoiceStatusEmail } = require('../utils/emailService');

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
        //console.log(id);
        const invoice = await Invoice.findByIdAndUpdate(id, {$set: {verified: Number(stat)}}, { new: true });
        if(!invoice) {
            return res.status(400).json({message: "Error during update"});
        }

        
        // email notification regarding invoice status
        await sendInvoiceStatusEmail(invoice.email, invoice.firstName, stat);

        return res.status(200).json({message: "All set!"});
    } catch(err) {
        return res.status(400).json({message: `${err}`});
    }
});

router.get('/check', async (req, res) => {
    const { email } = req.query;
    try {
        const invoice = await Invoice.findOne({ email });
        if (invoice) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error checking invoice:', error);
        return res.status(500).json({ message: 'Error checking invoice', error });
    }
});

module.exports = router;
