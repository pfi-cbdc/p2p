const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const setRateLimit = require('express-rate-limit')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
require("dotenv").config();

const lenderRoutes = require("./routes/lender");
const borrowerRoutes = require("./routes/borrower");
const invoiceRoutes = require("./routes/invoice");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoute');
const investmentRoutes = require('./routes/investment')
const resetPassword = require('./routes/resetPassword')
const paymentRoutes = require('./routes/paymentRoutes')
const walletRoutes = require('./routes/wallet');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://chic-marigold-cdd8e6.netlify.app/"],
//     credentials: true,
//   })
// );

const corsOptions = {
  origin: ["http://localhost:3000", "https://harmonious-treacle-f674f9.netlify.app"], // Replace with your production domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configure express-session
// app.use(
//   session({
//     store: new session.MemoryStore(), // This will clear sessions on server restart
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     rolling: false, // Refresh session expiration on every request
//     cookie: {
//       secure: false, // Set to true if using HTTPS
//       maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
//     },
//   })
// );
app.use(
  cookieSession({
    name: "session", // The name of the cookie
    secret: "secret", // Replace with your secret for encrypting the cookie
    maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
    httpOnly: true, // Prevents XXS attacks
    secure: true, // Set to true if using HTTPS
    sameSite: 'none'
  })
);
app.set('trust proxy', 1);
// Configure express-rate-limiter
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: "You have exceeded your requests per minute limit",
  headers: true
});

// Configure Multer to store files in the 'uploads' folder
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({storage});

// app.use(upload.single('fileUpload')); // Ensure this is set up to handle file uploads

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Password reset route
app.use('/api/reset', resetPassword);

// Use the wallet routes
app.use('/api/wallet', walletRoutes);

// Serve uploaded files statically (if needed)
app.use("/uploads", express.static("uploads"));

// Payment Routes
app.use("/api/razor", paymentRoutes);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
