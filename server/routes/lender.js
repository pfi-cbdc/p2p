// server/routes/lender.js
const express = require('express');
const router = express.Router();
const Lender = require('../models/Lender');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
const upload = multer();

// POST route to create a new lender
router.post('/', upload.fields([{ name: 'aadharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'accountStatement', maxCount: 1 }]), async (req, res) => {
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

        const newLender = new Lender({
            firstName: req.body.firstName || localStorage.getItem('firstName'),
            aadharCard: uploadedFiles.aadharCard,
            panCard: uploadedFiles.panCard,
            accountStatement: uploadedFiles.accountStatement,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            gstNumber: req.body.gstNumber,
            employmentStatus: req.body.employmentStatus,
            email: req.body.email
        });

        await newLender.save();
        res.status(201).json({ message: 'Lender created successfully', lender: newLender });
    } catch (error) {
        res.status(400).json({ message: 'Error creating lender', error });
    }
});


// // POST route to add a new Investment
// // router.post('/newInv', authMiddleware, addInvestments);
// router.post('/newInv', addInvestments);



// Add this new route to check lender status
router.get('/status', async (req, res) => {
    const { email } = req.query;
    try {
        const lender = await Lender.findOne({ email });
        if (lender) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error checking lender status', error: error.message });
    }
});

module.exports = router;

router.get('/all', async (req, res) => {
    try {
        const lenders = await Lender.find();
        res.status(200).json(lenders);
    } catch (error) {
        console.error('Error fetching Lenders:', error);
        res.status(400).json({ message: 'Error fetching Lenders', error });
    }
});