const express = require('express');
const router = express.Router();
const Coffee = require('../models/coffee');
const Cakes = require('../models/cakes');
const Cookie = require('../models/cookies');

// Unified search endpoint
router.get('/', async (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : '';

        // Find matching items in parallel for better performance
        const [coffeeItems, cakeItems, cookieItems] = await Promise.all([
            Coffee.find({ name: { $regex: query, $options: 'i' } }), // Case-insensitive regex search
            Cakes.find({ name: { $regex: query, $options: 'i' } }),
            Cookie.find({ name: { $regex: query, $options: 'i' } })
        ]);

        // Combine and structure results
        const allItems = [
            ...coffeeItems.map(item => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                img: `https://res.cloudinary.com/diz0meysc/image/upload/${item.img}`,
                category: 'Coffee'
            })),
            ...cakeItems.map(item => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                img: `https://res.cloudinary.com/diz0meysc/image/upload/${item.img}`,
                category: 'Cake'
            })),
            ...cookieItems.map(item => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                img: `https://res.cloudinary.com/diz0meysc/image/upload/${item.img}`,
                category: 'Cookie'
            }))
        ];
        console.log(allItems);

        res.status(200).json(allItems);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Error fetching items' });
    }
});

module.exports = router;
