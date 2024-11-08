const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');
const { sendBorrowerStatusEmail } = require('../utils/emailService');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to create a new borrower with file uploads
router.post('/', upload.fields([{ name: 'aadharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'accountStatement', maxCount: 1 }]), async (req, res) => {
    try {
        const uploadedFiles = {
            aadharCard: [],
            panCard: [],
            accountStatement: []
        };

        // Upload each file to Cloudinary
        for (const field of ['aadharCard', 'panCard', 'accountStatement']) {
            if (req.files[field]) {
                for (const file of req.files[field]) {
                    const stream = Readable.from(file.buffer); // Convert buffer to stream
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
                    uploadedFiles[field].push(result.secure_url);
                }
            }
        }

        // Create a new borrower entry in the database
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
        console.error('Error creating borrower:', error);
        res.status(400).json({ message: 'Error creating borrower', error });
    }
});

// Route to check borrower status
router.get('/status', async (req, res) => {
    const { email } = req.query;
    try {
        const borrower = await Borrower.findOne({ email });
        if (borrower) {
            return res.status(200).json({ exists: true, verified: borrower.verified });
        }
        return res.status(200).json({ exists: false, verified: 3 }); // 3 - does not exist
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error checking borrower status', error: error.message });
    }
});

// Fetch all borrowers for admin dashboard
router.get('/all', async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.status(200).json(borrowers);
    } catch (error) {
        console.error('Error fetching borrowers:', error);
        res.status(400).json({ message: 'Error fetching borrowers', error });
    }
});

router.put('/update', async (req, res) => {
    const {id, stat} = req.body;
    //console.log(id);
    //console.log(stat);
    const borrower = await Borrower.findByIdAndUpdate(id, { $set: { verified: Number(stat) } }, { new: true });
    if (!borrower) {
        return res.status(400).json({ message: "Error during update" });
    }

    await sendBorrowerStatusEmail(borrower.email, borrower.firstName, stat);
    
    
    const invoice = await Borrower.findByIdAndUpdate(id, {$set: {verified: Number(stat)}});
    if(!invoice) {
        return res.status(400).json({message: "Error during update"});
    }
    return res.status(200).json({message: "All set!"});
  });

module.exports = router;
