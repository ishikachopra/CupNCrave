// index.js
const express = require('express');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require('./middlewares/db');
const ReviewRouter =require("./routes/reviews");
const { handleGetInStockCakes} = require('./controllers/cakes');
const {handleGetInStockCookies} = require('./controllers/cookies');
const {handleGetInStockCoffee} = require('./controllers/coffee');
const userRoute = require('./routes/user');
const CheckoutRoute = require('./routes/checkout');
const ordersRoute = require('./routes/orders');
const { authenticate, verifyAdmin } = require('./middlewares/tokenAuthenticate');
const { HandleGetHistory,getOrderStatus } = require('./controllers/orders');
const { handleLogout } = require('./controllers/logout');
const adminRoute = require('./routes/admin');
const cakeRoute = require('./routes/cakes');
const cookieRoute = require('./routes/cookies');
const coffeeRoute = require('./routes/coffee');
const otpRoute=require('./routes/otpRoutes');
const paymentRoutes = require("./routes/payment");
const searchRoute=require("./routes/search");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3002'], 
    credentials: true, // Allow cookies to be sent
}));

app.use(express.json());       //to parse req.body
app.use(express.urlencoded({ extended: false }));    // to parse form data
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

//=======================================================================================================
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
app.post("/CupnCrave/CreateRazorpayOrder", async (req, res) => {
    const { total } = req.body;

    if (!total || total <= 0) {
        return res.status(400).json({ message: "Invalid order total." });
    }

    const amountInPaise = total * 100; // Convert to paise
    const currency = "INR";

    try {
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency,
            receipt: `receipt_${ Date.now() }`,
        });

res.status(200).json({
    id: order.id,
    currency: order.currency,
    amount: order.amount,
});
    } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating Razorpay order." });
}
});

app.post("/CupnCrave/VerifyRazorpayPayment", (req, res) => {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        return res.status(400).json({ message: "Missing required payment details." });
    }

    try {
        // Create a HMAC SHA256 signature using Razorpay order ID and payment ID
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (generatedSignature === razorpaySignature) {
            // Payment is verified
            console.log("Payment verified successfully");
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            // Signature mismatch
            console.error("Payment verification failed: Signature mismatch");
            return res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//=========================================================================================================

app.get('/CupnCrave/Menu/cake', handleGetInStockCakes, (req, res) => {
    res.json({ message: 'Success'});
});
app.get('/CupnCrave/Menu/cookie', handleGetInStockCookies, (req, res) => {
    res.json({ message: 'Success' });
});
app.get('/CupnCrave/Menu/coffee', handleGetInStockCoffee, (req, res) => {
    res.json({ message: 'Success'});
});

app.use('/CupnCrave', userRoute);
app.use('/CupnCrave', otpRoute);
app.get('/CupnCrave/orders/status/:orderId',authenticate, getOrderStatus);
app.get('/CupnCrave/orders', authenticate, HandleGetHistory);
app.use('/CupnCrave/search',searchRoute);

app.use('/CupnCrave/reviews',ReviewRouter);

// app.get('/CupnCrave/Checkout', authenticate, (req, res) => {
//     res.json({ message: 'This is protected data', user: req.user });
// });

app.use('/CupnCrave/Checkout', CheckoutRoute);
app.use('/CupnCrave/payment', paymentRoutes);

app.get('/CupnCrave/profile-display', authenticate, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});

app.get('/CupnCrave/logout', handleLogout);



app.use('/CupnCrave/admin',adminRoute);
app.use('/CupnCrave/admin/cake', verifyAdmin, cakeRoute);
app.use('/CupnCrave/admin/coffee', verifyAdmin, coffeeRoute);
app.use('/CupnCrave/admin/cookie', verifyAdmin, cookieRoute);
app.use('/CupnCrave/admin/orders', verifyAdmin, ordersRoute);


app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(port, () => {
    console.log('Server started')
})
