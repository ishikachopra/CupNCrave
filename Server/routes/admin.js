const express = require('express');
const router = express.Router();
const {handleAdminLogin,handleAdminSignup}=require('../controllers/admin');

router.post('/login', handleAdminLogin);
router.post('/signup',handleAdminSignup);


module.exports=router;