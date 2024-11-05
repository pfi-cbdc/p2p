// server/routes/lender.js
const express = require('express');
const router = express.Router();
const Lender = require('../models/Lender');
const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('multer');
const { Readable } = require('stream');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to create a new lender
router.post(
  '/',
  upload.fields([{ name: 'aadharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'accountStatement', maxCount: 1 }]),
  async (req, res) => {
    try {
      const uploadedFiles = {
        aadharCard: [],
        panCard: [],
        accountStatement: []
      };

      for (const field of ['aadharCard', 'panCard', 'accountStatement']) {
        if (req.files[field]) {
          for (const file of req.files[field]) {
            // Convert file buffer to readable stream
            const stream = Readable.from(file.buffer);

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

      const newLender = new Lender({
        firstName: req.body.firstName,
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
      console.error('Error creating lender:', error);
      res.status(400).json({ message: 'Error creating lender', error });
    }
  }
);

// Route to check lender status
router.get('/status', async (req, res) => {
  const { email } = req.query;
  try {
    const lender = await Lender.findOne({ email });
    return res.status(200).json({ exists: lender ? true : false });
  } catch (error) {
    console.error('Error checking lender status:', error);
    return res.status(500).json({ message: 'Error checking lender status', error: error.message });
  }
});

// Route to get all lenders
router.get('/all', async (req, res) => {
  try {
    const lenders = await Lender.find();
    res.status(200).json(lenders);
  } catch (error) {
    console.error('Error fetching lenders:', error);
    res.status(400).json({ message: 'Error fetching lenders', error });
  }
});

module.exports = router;
