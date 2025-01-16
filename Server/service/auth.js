const jwt=require("jsonwebtoken");
require('dotenv').config();

function setUser(user){
    return jwt.sign(
        {
        _id:user._id,
        email:user.email,
        role: 'user',
        }, process.env.SECRET_KEY 
    );
}

function setAdmin(admin) {
    return jwt.sign(
        {
            _id: admin._id,
            email: admin.email,
            role: 'admin',
        }, process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

//decoded user info is returned if user authenticated by token, else null is returned
function getUser(token) {
    if (!token) return null; // If no token is provided, return null
    try {
        return jwt.verify(token, process.env.SECRET_KEY); // Try to verify the token using the secret , return payload ie decoded user information
    } catch {
        return null; // If verification fails (e.g., invalid token), return null
    }
}




module.exports={
    setUser,
    getUser,
    setAdmin
}