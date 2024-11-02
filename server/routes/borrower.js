// server/routes/borrower.js
const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');

// Configure Multer for multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// POST route to create a new borrower with file uploads
router.post('/', upload.fields([{ name: 'aadharCard', maxCount: 10 }, { name: 'panCard', maxCount: 10 }, { name: 'accountStatement', maxCount: 10 }]), async (req, res) => {
    try {
        const uploadedFiles = {
            aadharCard: [],
            panCard: [],
            accountStatement: []
        };

        for (const field of ['aadharCard', 'panCard', 'accountStatement']) {
            if (req.files[field]) {
                for (const file of req.files[field]) {
                    const result = await cloudinary.uploader.upload(file.path, { folder: 'pfi' });
                    uploadedFiles[field].push(result.secure_url);
                }
            }
        }

        const newBorrower = new Borrower({
            firstName: req.body.firstName || localStorage.getItem('firstName'),
            aadharCard: uploadedFiles.aadharCard,
            panCard: uploadedFiles.panCard,
            accountStatement: uploadedFiles.accountStatement,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            gstNumber: req.body.gstNumber,
            typeOfBusiness: req.body.typeOfBusiness,
            email: req.body.email
        });

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


// Fetch all invoices for admin dashboard
router.get('/all', async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.status(200).json(borrowers);
    } catch (error) {
        console.error('Error fetching borrowers:', error);
        res.status(400).json({ message: 'Error fetching borrowers', error });
    }
});
