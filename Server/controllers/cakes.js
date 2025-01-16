const Cakes = require('../models/cakes');

async function handleCreateCakes(req, res) {
    try {
        const { name, price } = req.body;

        if (!name || !price || !req.file) {
            return res.status(400).json({
                msg: "Name, price, and image fields are required.",
            });
        }

        const newCake = await Cakes.create({
            name,
            price,
            img: req.file.filename,
        });

        console.log("Cake created successfully");

        return res.status(200).json({
            msg: "Cake created",
            data: newCake,
        });
    } catch (error) {
        console.error("Error creating cake:", error);
        return res.status(500).json({
            msg: "Server error. Failed to create cake.",
            error: error.message,
        });
    }
}


async function handleGetCakes(req, res) {
    try {
        const cakes = await Cakes.find();

        // Replace the `img` field with the full Cloudinary URL
        const cakesWithImageUrls = cakes.map(cake => ({
            ...cake.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${cake.img}`
        }));

        console.log(cakesWithImageUrls);
        res.send(cakesWithImageUrls);
    } catch (error) {
        console.error('Error fetching cakes:', error.message);
        res.status(500).json({ msg: 'Failed to fetch cakes', error: error.message });
    }
}

async function handleGetInStockCakes(req, res) {
    try {
        const cakes = await Cakes.find({ inStock: true });

        // Replace the `img` field with the full Cloudinary URL
        const cakesWithImageUrls = cakes.map(cake => ({
            ...cake.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${cake.img}`
        }));

        console.log(cakesWithImageUrls);
        res.send(cakesWithImageUrls);
    } catch (error) {
        console.error('Error fetching cakes:', error.message);
        res.status(500).json({ msg: 'Failed to fetch cakes', error: error.message });
    }
}


async function handleUpdateCakes(req, res) {
    const updatedCake = await Cakes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedCake);
}

const markAsOutOfStock = async (req, res) => {
    try {
        const { id } = req.params;

        const cake = await Cakes.findByIdAndUpdate(
            id,
            { inStock: false },
            { new: true } // Return the updated document
        );
        if (!cake) {
            return res.status(404).json({ error: 'Cake not found' });
        }

        res.status(200).json({ message: 'Cake marked as out of stock', cake });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the stock status' });
    }
};

// Controller to mark a product as in stock
const markAsInStock = async (req, res) => {
    try {
        const { id } = req.params;

        const cake = await Cakes.findByIdAndUpdate(
            id,
            { inStock: true },
            { new: true } // Return the updated document
        );
        console.log(cake);

        if (!cake) {
            return res.status(404).json({ error: 'Cake not found' });
        }

        res.status(200).json({ message: 'Cake marked as in stock', cake });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the stock status' });
    }
};

async function handleDeleteCakes(req, res) {
    await Cakes.findByIdAndDelete(req.params.id);
    res.send({ message: 'Cake deleted' });
}

module.exports = {
    handleCreateCakes,
    handleDeleteCakes,
    handleGetCakes,
    handleGetInStockCakes,
    handleUpdateCakes,
    markAsInStock,
    markAsOutOfStock
}