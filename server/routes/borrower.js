const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');
const User = require('../models/User');
const { sendBorrowerStatusEmail } = require('../utils/emailService');

const BorrowerWallet = require('../models/BorrowerWallet'); 


// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
}

// POST route to create a new borrower with file uploads
router.post(
    '/',
    isAuthenticated,
    upload.fields([{ name: 'aadharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'accountStatement', maxCount: 1 }]),
    async (req, res) => {
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
                userID: req.session.user.id,
                aadharCard: uploadedFiles.aadharCard,
                panCard: uploadedFiles.panCard,
                accountStatement: uploadedFiles.accountStatement,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                gstNumber: req.body.gstNumber,
                typeOfBusiness: req.body.typeOfBusiness
            });

            await newBorrower.save();

            // Create a new wallet for the borrower
            const borrowerWallet = new BorrowerWallet({
                borrowerID: newBorrower._id, // Link wallet to the borrower
                balance: 500 // Initial balance
            });

            await borrowerWallet.save(); // Save the wallet
            res.status(201).json({ message: 'Borrower created successfully', borrower: newBorrower });
        } catch (error) {
            console.error('Error creating borrower:', error);
            res.status(400).json({ message: 'Error creating borrower', error });
        }
    }
);

// Route to check borrower status
router.get('/status', isAuthenticated, async (req, res) => {
    try {
        const borrower = await Borrower.findOne({ userID: req.session.user.id });
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
        const users = await User.find();
        const borrowerWithUserDetails = borrowers.map(borrower => {
            const user = users.find(user => user._id.equals(borrower.userID));
            return {
                ...borrower.toObject(),
                firstName: user ? user.firstName : '---',
                email: user ? user.email : '---'
            };
        });
        res.status(200).json(borrowerWithUserDetails);
    } catch (error) {
        console.error('Error fetching borrowers:', error);
        res.status(400).json({ message: 'Error fetching borrowers', error });
    }
});

// Update borrower status
router.put('/update', async (req, res) => {
    const { id, stat } = req.body;

    try {
        const borrower = await Borrower.findByIdAndUpdate(id, { verified: Number(stat) }, { new: true });
        if (!borrower) {
            return res.status(400).json({ message: 'Error during update' });
        }

        const user = await User.findById(borrower.userID);
        await sendBorrowerStatusEmail(user.email, user.firstName, stat);

        res.status(200).json({ message: 'Status updated successfully!' });
    } catch (error) {
        console.error('Error updating borrower status:', error);
        res.status(500).json({ message: 'Error updating borrower status', error: error.message });
    }
});

// Route to get user profile and borrower details
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const borrower = await Borrower.findOne({ userID: user._id });
        if (!borrower) {
            return res.status(404).json({ message: 'Borrower profile not found' });
        }

        //console.log(borrower);

        const userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            borrowerId: borrower.borrowerId
        };

        return res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

module.exports = router;
