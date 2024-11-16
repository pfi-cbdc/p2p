const crypto = require("crypto");
const Payment = require("../models/Payment.js");
const Borrower = require("../models/Borrower.js");
const invoice = require("../models/invoice.js");
const Razorpay = require('razorpay');
const Lender = require("../models/Lender.js");
const User = require("../models/User.js");
const { sendBorrowerPaymentEmail } = require("../utils/emailService.js");
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
        const amount = payment.amount/100;
        
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
          amount,
          invoiceID: invoices ? invoices._id : '',
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

const updatePayment = async(req, res) => {
  // update the approved status of the payment as per the body 
  try {
    const payment = await Payment.updateOne({_id: req.body.id}, {approved: req.body.approved}); // update the payment
    const updatedPayment = await Payment.findById(req.body.id); // get the updated payment for its ID
    const borrower = await Borrower.findById(updatedPayment.borrowerID); // get the borrower according to the payment
    const user = await User.findById(borrower.userID); // get the user according to the borrower
    await invoice.updateOne({_id: updatedPayment.invoiceID}, {closed: req.body.approved}); // update the invoice and make it closed: T/F
    if(req.body.approved) {
      sendBorrowerPaymentEmail(user.email, updatedPayment.amount);
    }
    res.status(200).json({success: true, payment});
  } catch(err) {
    res.status(400).json({success: false, message: err.message});
  }
}

const getApprovedPayments = async(req, res) => {
  try {
    const payments = await Payment.find({approved: true});
    res.status(200).json({success: true, payments});
  } catch(err) {
    res.status(400).json({success: false, message: err.message});
  }
}

const getAllPayments = async (req, res) => {
  try {
    let payment = await Payment.find({});
    const paymentDetails = await Promise.all(payment.map(async (pay) => {
      const borrower = pay ? await Borrower.findById(pay.borrowerID) : null;
      const lender = pay ? await Lender.findById(pay.lenderID) : null;
      const userLender = lender ? await User.findById(lender.userID) : '---';
      const userBorrower = borrower ? await User.findById(borrower.userID) : '---';
      return {
        ...pay._doc,
        borrowerEmail: userBorrower ? userBorrower.email : '---',
        lenderEmail: userLender ? userLender.email : '---'
      };
    }));
    payment = paymentDetails;
    res.status(200).json({success: true, payment});
  } catch(err) {
    res.status(400).json({success: false, message: err.message});
  }
}

module.exports = {
    checkout,
    paymentVerification,
    updatePayment,
    getApprovedPayments,
    getAllPayments
};