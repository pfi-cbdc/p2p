const crypto = require("crypto");
const Payment = require("../models/Payment.js");
const Borrower = require("../models/Borrower.js");
const invoice = require("../models/invoice.js");
const Razorpay = require('razorpay');
const Lender = require("../models/Lender.js");
const User = require("../models/User.js");
require('dotenv').config();

// RazorPay Instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

const checkout = async (req, res) => {
  
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const payment = await instance.payments.fetch(razorpay_payment_id);
        const notes = payment.notes;
        
        const invoices = await invoice.findById(notes.invoiceID);
        const borrower = await Borrower.findById(invoices.borrowerID);
        const user = await User.findOne({email: notes.lenderEmail});
        const lender = await Lender.findOne({userID: user._id});
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");
    
        const isAuthentic = expectedSignature === razorpay_signature;
    
      if (isAuthentic) {
        const newPayment = new Payment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          borrowerID: borrower ? borrower._id : '',
          lenderID: lender ? lender._id : ''
        });
        await newPayment.save();
    
        res.redirect(
          `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
          // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
      } else {
        res.status(400).json({
          success: false,
        });
      }
    } catch(err) {
        return res.redirect(`${process.env.FRONTEND_URL}/lender-payments`);
        // return res.redirect(`http://localhost:3000/lender-payments`);
    }
};

module.exports = {
    checkout,
    paymentVerification,
};