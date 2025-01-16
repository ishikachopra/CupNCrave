const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/payment");

const router = express.Router();

// Route to create Razorpay order
router.post("/CupnCrave/CreateRazorpayOrder", createOrder);

// Route to verify Razorpay payment
router.post("/CupnCrave/VerifyRazorpayPayment", verifyPayment);

module.exports = router;
