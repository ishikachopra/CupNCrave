const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const { setAdmin } = require('../service/auth')

async function handleAdminSignup(req, res) {
    try {

        console.log(req.body);
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);


        // Use User.create to add the new user to the database
        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Admin registered successfully', user: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


async function handleAdminLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Fetch Super Admin details from database
        const superAdmin = await Admin.findOne({ email });
        if (!superAdmin) return res.status(404).json({ message: "Super Admin not found" });

        // Validate password
        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT for Super Admin
        const token = setAdmin(superAdmin);

        res.cookie('admin_id', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    handleAdminLogin,
    handleAdminSignup
}