const express = require('express');
const router = express.Router();

const {getOrderStatus,incrementOrderStatus,HandleGetOrders} = require("../controllers/orders");

router.get('/status/:orderId', getOrderStatus);
router.put('/status/:orderId', incrementOrderStatus);
router.get('/allOrders',HandleGetOrders);

module.exports = router;