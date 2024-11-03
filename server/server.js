const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const setRateLimit = require('express-rate-limit')
require("dotenv").config();

const lenderRoutes = require("./routes/lender");
const borrowerRoutes = require("./routes/borrower");
const invoiceRoutes = require("./routes/invoice");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoute');
const investmentRoutes = require('./routes/investment')

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configure express-session
app.use(
  session({
    store: new session.MemoryStore(), // This will clear sessions on server restart
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    rolling: false, // Refresh session expiration on every request
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
    },
  })
);

// Configure express-rate-limiter
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: "You have exceeded your requests per minute limit",
  headers: true
});

// Configure Multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// app.use(upload.single('fileUpload')); // Ensure this is set up to handle file uploads

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth route
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes)

// Lender route
app.use("/api/lender", lenderRoutes);
app.use('/api/lenders', lenderRoutes)

// Borrower route
app.use("/api/borrower", borrowerRoutes);
app.use('/api/borrowers', borrowerRoutes);

// Admin Route
app.use('/api/admin', rateLimitMiddleware,  adminRoutes);

//investment ka randi rona
app.use('/api/investment', investmentRoutes);
app.use('/api/investments', investmentRoutes)

// Invoice route
app.use("/api/invoice", invoiceRoutes);
app.use('/api/invoices', invoiceRoutes);  // Invoice route


// Serve uploaded files statically (if needed)
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
