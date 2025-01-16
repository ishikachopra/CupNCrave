const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { sendGreetMail } = require("../helper/mail");
const { setUser, getUser } = require('../service/auth')


async function handleUserSignup(req, res) {
    try {
        
        console.log(req.body);
        const { name, email, number,address,gender,password,dob} = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            email,
            number,
            address,
            gender,
            dob,
            password: hashedPassword,
        });

        try {
            await sendGreetMail(email,name);
            console.log('Greeting email sent!');
        } catch (error) {
            console.error('Error sending email:', error);
        } 

            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        let isMatch;
        try {
            isMatch = await bcrypt.compare(password, user.password);
        } catch (error) {
            console.error("Error in bcrypt.compare:", error);
            throw error; // Rethrow if necessary
        }
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        const token = setUser(user);  

        res.cookie('uid', token, {
            httpOnly: true,    //so javascript doesnt access our cookie and steal senitive info from browser
            path: '/',
        });

        return res.status(200).json({
            message: 'Login successful',
            token, 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function handleGetUser(req, res) {
    try {
        // Get the token from the cookie
        const token = req.cookies.uid;

        if (!token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Fetch user data by ID from the decoded token
        const user = await User.findById(decoded._id).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
}

async function handleUpdateInfo(req,res){
    const token = req.cookies.uid;
    const decoded=getUser(token);
    try{
        const user = await User.findByIdAndUpdate(decoded._id, req.body, { new: true });
        res.send(user);
    }
    catch (error) {
        console.error("Error updating coffee:", error.message);
        res.status(500).send({ message: "Error updating coffee", error: error.message });
    }
}



module.exports = {
    handleUserLogin,
    handleUserSignup,
    handleGetUser,
    handleUpdateInfo
}