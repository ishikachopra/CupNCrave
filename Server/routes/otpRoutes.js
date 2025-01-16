const express=require('express');
const router = express.Router();
const { sendOtp }=require('../helper/sendOtp');
const verifyOtp = require('../helper/verifyOtp');

router.post('/forgot-password', sendOtp);
router.post('/verify', verifyOtp);

module.exports = router;