const { checkout, paymentVerification } = require("../controllers/payments");
const express = require("express");

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

module.exports = router;