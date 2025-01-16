const Cookies = require('../models/cookies');

async function handleCreateCookies(req, res) {
    try {
        const { name, price } = req.body;

        if (!name || !price || !req.file) {
            return res.status(400).json({
                msg: "Name, price, and image fields are required.",
            });
        }

        const cookie = await Cookies.create({
            name,
            price,
            img: req.file.filename,
        });

        console.log("cookie created");

        return res.status(201).json({
            msg: "cookie created",
            data: cookie
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to create cookie",
            error: error.message
        });
    }

}

async function handleGetCookies(req, res) {
    try {
        const cookies = await Cookies.find();

        // Map through cookies and construct full Cloudinary URLs for the `img` field
        const cookiesWithImageUrls = cookies.map(cookie => ({
            ...cookie.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${cookie.img}`,
        }));

        console.log(cookiesWithImageUrls);
        res.send(cookiesWithImageUrls);
    } catch (error) {
        console.error('Error fetching cookies:', error.message);
        res.status(500).json({ msg: 'Failed to fetch cookies', error: error.message });
    }
}

async function handleGetInStockCookies(req, res) {
    try {
        const cookies = await Cookies.find({inStock:true});

        // Map through cookies and construct full Cloudinary URLs for the `img` field
        const cookiesWithImageUrls = cookies.map(cookie => ({
            ...cookie.toObject(), // Convert Mongoose document to plain object
            img: `https://res.cloudinary.com/diz0meysc/image/upload/${cookie.img}`,
        }));

        console.log(cookiesWithImageUrls);
        res.send(cookiesWithImageUrls);
    } catch (error) {
        console.error('Error fetching cookies:', error.message);
        res.status(500).json({ msg: 'Failed to fetch cookies', error: error.message });
    }
}


async function handleUpdateCookies(req, res) {
    const updatedcookie = await Cookies.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedcookie);
}

async function handleDeleteCookies(req, res) {
    await Cookies.findByIdAndDelete(req.params.id);
    res.send({ message: 'cookie deleted' });
}

const markAsOutOfStock = async (req, res) => {
    try {
        const { id } = req.params;

        const coffee = await Cookies.findByIdAndUpdate(
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

        const coffee = await Cookies.findByIdAndUpdate(
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
    handleCreateCookies,
    handleDeleteCookies,
    handleGetCookies,
    handleGetInStockCookies,
    handleUpdateCookies,
    markAsInStock,
    markAsOutOfStock
}