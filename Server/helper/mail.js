const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendGreetMail = async (to, name) => {
    const subject = "Registration Successful - Welcome to Cup N Crave!";
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER ,  // Use environment variable
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: body(name)
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email: ' + error);
    }
    
};


function body(name) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; text-align: center;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <img src="http://localhost:3001/CupnCrave/images/finallogo.png" alt="Cup N Crave Logo" style="max-width: 150px; margin-bottom: 20px;">

                <h2 style="color: #333;">Welcome, ${name}!</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    Thank you for registering with <strong>Cup N Crave</strong>. We are thrilled to have you on board and can't wait for you to explore our delicious offerings.
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    If you have any questions or need assistance, feel free to reach out to us. We're here to help!
                </p>
                <p style="color: #333; font-size: 16px; font-weight: bold;">Best regards,</p>
                <p style="color: #333; font-size: 16px;">The Cup N Crave Team</p>
            </div>
        </div>
    `;
}







