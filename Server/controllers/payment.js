const { log } = require("console");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
require('dotenv').config();

exports.createOrder = async (req, res) => {
    const { total } = req.body;


    if (!total || total <= 0) {
        return res.status(400).json({ message: "Invalid order total." });
    }

    const amountInPaise = total * 100;
    const currency = "INR";

    try {
        console.log("1");
        console.log(razorpay.orders);
        
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency,
            receipt: `receipt_${Date.now()}`,
        });
        console.log("2");

        console.log(order);


        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating Razorpay order." });
    }
};


exports.verifyPayment = (req, res) => {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        return res.status(400).json({ message: "Missing required payment details." });
    }

    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (generatedSignature === razorpaySignature) {
            console.log("Payment verified successfully");
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            console.error("Payment verification failed: Signature mismatch");
            return res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
