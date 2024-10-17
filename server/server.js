const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const lenderRoutes = require('./routes/lender');
const borrowerRoutes = require('./routes/borrower');
const invoiceRoutes = require('./routes/Invoice'); 

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

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