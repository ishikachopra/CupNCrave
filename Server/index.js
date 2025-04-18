// index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
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
    origin: [process.env.FRONTEND_CLIENT_URL, process.env.FRONTEND_ADMIN_URL], 
    credentials: true, // Allow cookies to be sent
}));

app.use(express.json());       //to parse req.body
app.use(express.urlencoded({ extended: false }));    // to parse form data
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


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
