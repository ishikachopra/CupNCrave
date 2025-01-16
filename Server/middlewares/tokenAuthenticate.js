const express = require('express');

require('dotenv').config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.uid ; // Assuming token is sent in cookies or headers

    if (!token) {
        return res.status(500).json({ message: 'No token provided' });
    }


    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verifying the token using the secret
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        req.user = decoded;  // If token is valid, attach the decoded data (usually user info) to req.user , hence user info will be attached to backend
        next();  // Call the next middleware or route handler
    } catch (error) {
        return res.status(501).json({ message: 'Invalid token' });
    }
};

function verifyAdmin(req, res, next) {
    const token = req.cookies.admin_id;
    console.log(token);
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if (verified.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        req.admin = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
}


module.exports={
    authenticate,
    verifyAdmin
}
