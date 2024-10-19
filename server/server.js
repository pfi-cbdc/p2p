const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const lenderRoutes = require('./routes/lender');
const borrowerRoutes = require('./routes/borrower');
const invoiceRoutes = require('./routes/Invoice'); 

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');  // 'uploads' is the folder for storing files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
  });
  
  const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

/// Handle form submissions
app.post('/api/invoice', upload.single('fileUpload'), (req, res) => {
    const { typeOfBusiness, tenureOfInvoice, interestRate } = req.body;
    const file = req.file; // Multer will store the file here
  
    console.log('File:', file);
    console.log('Form Data:', req.body);
  
    // Here, you can store the file path and form data in your database
    res.json({
      message: 'Form submitted successfully!',
      filePath: file.path, // The path where the file is stored
      formData: req.body
    });
  });
  
  // Serve uploaded files statically (if needed)
  app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Lender route
app.use('/api/lender', lenderRoutes);

// Borrower route
app.use('/api/borrower', borrowerRoutes);

// Invoice route
app.use('/api/invoice', invoiceRoutes); // Use invoice routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});