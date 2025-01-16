const express = require('express');
const router = express.Router();
const {handleUserLogin,handleUserSignup,handleGetUser,handleUpdateInfo} = require('../controllers/user');
const { HandleGetOrderCount } = require('../controllers/orders');
const { authenticate} = require('../middlewares/tokenAuthenticate');


router.post('/signup',handleUserSignup);
router.post('/login',handleUserLogin);
router.get('/profile',authenticate, HandleGetOrderCount);
router.get('/profile/user-info',handleGetUser);
router.put('/profile/user-info',handleUpdateInfo);



module.exports=router;