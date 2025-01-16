const nodemailer = require('nodemailer');
const User = require("../models/user");
const crypto = require('crypto');
const otp = crypto.randomInt(100000,999999).toString();
require('dotenv').config();

const sendOtp = async (req,res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const {email} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({
            msg:"User not found"
        })
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            border-top: 10px solid #ff6600;
            transition: box-shadow 0.3s ease;
        }

        .email-container:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .email-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .email-header h2 {
            color: #333;
            font-size: 28px;
            margin: 0;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .email-body {
            line-height: 1.8;
            color: #555;
            font-size: 16px;
        }

        .email-body p {
            margin: 14px 0;
        }

        .otp-code {
            font-size: 32px;
            color: #ff6600;
            font-weight: bold;
            text-align: center;
            margin: 30px 0;
            letter-spacing: 2px;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-button {
            display: block;
            width: 100%;
            max-width: 250px;
            margin: 30px auto;
            text-align: center;
            background-color: #ff6600;
            color: #ffffff;
            padding: 14px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(255, 102, 0, 0.2);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .email-button:hover {
            background-color: #e55a00;
            box-shadow: 0 6px 14px rgba(255, 102, 0, 0.3);
        }

        .email-footer {
            margin-top: 40px;
            text-align: center;
            padding-top: 20px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #e2e2e2;
        }

        .email-footer a {
            color: #ff6600;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }

            .email-header h2 {
                font-size: 24px;
            }

            .otp-code {
                font-size: 28px;
            }

            .email-button {
                padding: 12px;
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Password Reset Request</h2>
        </div>
        <div class="email-body">
            <p>Dear ${user.name},</p>
            <p>We received a request to reset your password. Please use the OTP below to reset your password:</p>
            <div id="otpCode" class="otp-code">${otp}</div>
            <p>This OTP is valid for the next 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email or <a href="mailto:support@yourcompany.com">contact support</a>.</p>
        </div>
        <button class="email-button">Copy OTP</button>
        <div class="email-footer">
            <p>Best regards,<br>Your Company Name</p>
            <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
        `
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                msg:"Failed to send email "
            })
        }
        res.status(200).json({
            msg:"Otp send successfully",
            otp
        })
    })
}
module.exports = {
    sendOtp,
    otp,
}