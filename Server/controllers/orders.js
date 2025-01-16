const express = require('express');
const Orders = require('../models/orders');

async function HandleGetHistory(req, res) {
    try {
        const userId = req.user._id; // Extracted from the token by the `authenticate` middleware
        const userorders = await Orders.find({ user: userId }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.send(userorders);
        // return res.status(500).json({ success: false, message: userorders});
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

async function HandleGetOrderCount(req, res) {
    try {
        const userId = req.user._id; // Extracted from the token by the `authenticate` middleware
        console.log(userId);
        const orderCount = await Orders.countDocuments({
            user: userId,
            total: { $gt: 500 } // Only count orders with a price greater than 500
        });
        res.status(200).json({ success: true, orderCount });
    } catch (error) {
        console.error('Error fetching order count:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch order count' });
    }
}



async function HandleGetOrders(req, res) {
    try {
        const userorders = await Orders.find().sort({ createdAt: -1 });
        res.send(userorders);
    }
    catch {
        // console.error('Error fetching orders:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

const incrementOrderStatus = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order
        const order = await Orders.findById(orderId);

        // If order not found
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Define valid statuses
        const validStatuses = [1, 2, 3, 4];

        // Check if status can be incremented
        if (!validStatuses.includes(order.status)) {
            return res.status(400).json({ message: "Status cannot be incremented further" });
        }

        // Increment status
        order.status += 1;
        await order.save();

        res.status(200).json({ message: "Order status incremented", order });
    } catch (err) {
        console.error("Error incrementing order status:", err);
        res.status(500).json({ message: "Failed to increment order status", error: err.message });
    }
};

const getOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Orders.findById(orderId);
        console.log(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not Found", orderId:orderId});
        }

        res.status(200).json({ status: order.status });
    } catch (err) {
        console.error("Error fetching order status:", err);
        res.status(500).json({ message: "Failed to fetch order status", error: err.message });
    }
};




async function handleOrderPlacement(req, res) {
    try {
        const { cartItems, total } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Create a new order
        const newOrder = new Orders({
            user: req.user._id, // From authenticate middleware
            items: cartItems,
            total,
        });
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }

}

module.exports = {
    HandleGetHistory,
    HandleGetOrders,
    handleOrderPlacement,
    getOrderStatus,
    incrementOrderStatus,
    HandleGetOrderCount
}