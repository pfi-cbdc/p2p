const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');
const User = require('../models/User');
const Borrower = require('../models/Borrower');
const Payment = require('../models/Payment');
const Lender = require('../models/Lender');
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

        // get the user and borrower
        const user = await User.findOne({ email: req.body.email });
        const borrower = await Borrower.findOne({ userID: user._id });

        // Save invoice details to database
        const newInvoice = new Invoice({
            fileUpload: result.secure_url,
            typeOfBusiness: req.body.typeOfBusiness,
            tenureOfInvoice: req.body.tenureOfInvoice,
            interestRate: req.body.interestRate,
            borrowerID: borrower._id
            // firstName: req.body.firstName,
            // email: req.body.email
        });

        await newInvoice.save();
        res.status(201).json({ message: 'Invoice Submitted', fileUpload: result.secure_url });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(400).json({ message: 'Error creating invoice', error });
    }
});

// Fetch all closed invoices for borrower dashboard
router.get('/closed/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const borrower = await Borrower.findOne({ userID: user._id });
        const invoices = await Invoice.find({ borrowerID: borrower._id, closed: true });
        const response = await Promise.all(invoices.map(async (invoice) => {
            const payments = await Payment.findOne({invoiceID: invoice._id});
            const lender = await Lender.findById(payments.lenderID);
            return {
                ...invoice.toObject(),
                amount: payments ? payments.amount : '---',
                lenderID: lender ? lender.lenderId : '---',
            };
        }))
        return res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(400).json({ message: 'Error fetching invoices', error });
    }
});

// Fetch all invoices for admin dashboard
router.get('/all', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        const borrowers = await Borrower.find();
        const users = await User.find();

        const invoicesWithUserDetails = invoices.map(invoice => {
            const borrower = borrowers.find(borrower => borrower._id.equals(invoice.borrowerID));
            const user = borrower ? users.find(user => user._id.equals(borrower.userID)) : null;
            return {
                ...invoice.toObject(),
                firstName: user ? user.firstName : '---',
                lastName: user ? user.lastName : '---',
                email: user ? user.email : '---'
            };
        });
        // console.log(invoicesWithUserDetails);

        return res.status(200).json(invoicesWithUserDetails);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(400).json({ message: 'Error fetching invoices', error });
    }
});

router.get('/all/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email : req.params.email });
        const borrower = user ? await Borrower.findOne({ userID: user._id }) : null;
        const invoices = borrower ? await Invoice.find({ borrowerID: borrower._id }) : null;
        // console.log(invoices);
        if(!invoices) {
            return res.status(400).json({ message: 'No invoices found' });
        }
        return res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(400).json({ message: 'Error fetching invoices', error });
    }
});

router.put('/update', async (req, res) => {
    try{
        const {id, stat } = req.body;
        //console.log(id);
        const invoice = await Invoice.findByIdAndUpdate(id, {$set: {verified: Number(stat)}}, { new: true });
        if(!invoice) {
            return res.status(400).json({message: "Error during update"});
        }
        const borrower = await Borrower.findById(invoice.borrowerID);
        const user = await User.findById(borrower.userID);
        
        // email notification regarding invoice status
        await sendInvoiceStatusEmail(user.email, user.firstName, stat);

        return res.status(200).json({message: "All set!"});
    } catch(err) {
        return res.status(400).json({message: `${err}`});
    }
});

router.get('/check', async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });
    const borrower = await Borrower.findOne({ userID: user._id });
    try {
        const invoice = await Invoice.findOne({ borrowerID: borrower._id });
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
