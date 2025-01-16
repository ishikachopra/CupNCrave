const Coffee = require('../models/coffee');
const cloudinary = require('cloudinary').v2;

async function handleCreateCoffee(req, res) {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !req.file || !description) {
            return res.status(400).json({
                msg: "Name, price, and image fields are required.",
            });
        }

        const newCoffee = await Coffee.create({
            name,
            price,
            img: req.file.filename,
            description
        });

        console.log("Coffee created successfully");

        return res.status(200).json({
            msg: "Coffee created",
            data: newCoffee
        });
    } catch (error) {
        console.error("Error creating coffee:", error);

        return res.status(500).json({
            msg: "Failed to create coffee",
            error: error.message
        });
    }
}


async function handleGetCoffee(req, res) {
    try {
        const coffee = await Coffee.find();

        // Replace the `img` field with the full Cloudinary URL
        const coffeeWithImageUrls = coffee.map(item => ({
            ...item.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${item.img}`
        }));

        console.log(coffeeWithImageUrls);
        res.send(coffeeWithImageUrls);
    } catch (error) {
        console.error('Error fetching coffee:', error.message);
        res.status(500).json({ msg: 'Failed to fetch coffee', error: error.message });
    }
}

async function handleGetInStockCoffee(req, res) {
    try {
        const coffee = await Coffee.find({inStock:true});

        // Replace the `img` field with the full Cloudinary URL
        const coffeeWithImageUrls = coffee.map(item => ({
            ...item.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${item.img}`
        }));

        console.log(coffeeWithImageUrls);
        res.send(coffeeWithImageUrls);
    } catch (error) {
        console.error('Error fetching coffee:', error.message);
        res.status(500).json({ msg: 'Failed to fetch coffee', error: error.message });
    }
}


async function handleUpdateCoffee(req, res) {
    try {
        const updatedcoffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedcoffee);
    }
    catch (error) {
        console.error("Error updating coffee:", error.message);
        res.status(500).send({ message: "Error updating coffee", error: error.message });
    }
}

async function handleDeleteCoffee(req, res) {
    await Coffee.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    res.send({ message: 'Coffee deleted' });
}

const markAsOutOfStock = async (req, res) => {
    try {
        const { id } = req.params;

        const coffee = await Coffee.findByIdAndUpdate(
            id,
            { inStock: false },
            { new: true } // Return the updated document
        );

        if (!coffee) {
            return res.status(404).json({ error: 'coffee not found' });
        }

        res.status(200).json({ message: 'coffee marked as out of stock', coffee });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the stock status' });
    }
};

// Controller to mark a product as in stock
const markAsInStock = async (req, res) => {
    try {
        const { id } = req.params;

        const coffee = await Coffee.findByIdAndUpdate(
            id,
            { inStock: true },
            { new: true } // Return the updated document
        );

        if (!coffee) {
            return res.status(404).json({ error: 'coffee not found' });
        }

        res.status(200).json({ message: 'coffee marked as in stock', coffee });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the stock status' });
    }
};

module.exports = {
    handleCreateCoffee,
    handleDeleteCoffee,
    handleGetCoffee,
    handleGetInStockCoffee,
    handleUpdateCoffee,
    markAsInStock,
    markAsOutOfStock
}