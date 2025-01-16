const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            img:String,
            name: String,
            price: Number,
            size: String,
            quantity: Number,
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        enum: [1,2,3,4],
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
