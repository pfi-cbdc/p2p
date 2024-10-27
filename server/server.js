const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const lenderRoutes = require('./routes/lender');
const borrowerRoutes = require('./routes/borrower');
const invoiceRoutes = require('./routes/Invoice');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure express-session
app.use(session({
    store: new session.MemoryStore(), // This will clear sessions on server restart
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    rolling: true, // Refresh session expiration on every request
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
    }
}));

// Configure Multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
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
app.use('/api/auth', authRoutes);

// Lender route
app.use('/api/lender', lenderRoutes);

// Borrower route
app.use('/api/borrower', borrowerRoutes);

// Invoice route
app.use('/api/invoice', invoiceRoutes);

// Serve uploaded files statically (if needed)
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
