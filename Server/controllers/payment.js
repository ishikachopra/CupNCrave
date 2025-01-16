require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create Razorpay Order
 */
exports.createOrder = async (req, res) => {
    try {
        const { total } = req.body;

        if (!total || total <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: total * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ error: "Failed to create Razorpay order" });
        }

        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Verify Razorpay Payment
 */
exports.verifyPayment = (req, res) => {
    try {
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
            return res.status(400).json({ error: "Missing required payment details" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (generatedSignature === razorpaySignature) {
            res.status(200).json({ message: "Payment verified successfully!" });

            // Additional logic (e.g., update order status in DB) can be added here
        } else {
            res.status(400).json({ error: "Invalid payment signature" });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
