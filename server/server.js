const express = require('express');
const session = require('express-session'); // Import express-session
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const lenderRoutes = require('./routes/lender');
const borrowerRoutes = require('./routes/borrower');
const invoiceRoutes = require('./routes/Invoice');
const authRoutes = require('./routes/authRoutes'); // Include your auth routes

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Only allow this origin
    credentials: true, // Allow cookies to be sent
  }));
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with your secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

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

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Auth route
app.use('/api/auth', authRoutes); // Use auth routes

// Lender route
app.use('/api/lender', lenderRoutes);

// Borrower route
app.use('/api/borrower', borrowerRoutes);

// Invoice route
app.use('/api/invoice', invoiceRoutes); // Use invoice routes

// Serve uploaded files statically (if needed)
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
