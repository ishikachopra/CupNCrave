const express = require('express');
const router = express.Router();

const {handleOrderPlacement}=require("../controllers/orders");
const {authenticate} = require('../middlewares/tokenAuthenticate');

router.get('/',authenticate,(req,res)=>{
    // Authentication verification
    res.json({ message: 'User is authenticated', user: req.user });
});

router.post('/',authenticate,handleOrderPlacement);

module.exports=router;