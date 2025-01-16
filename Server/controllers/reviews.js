const Reviews=require("../models/review");

async function HandleGetReviews(req,res){
    try{
        const reviews = await Reviews.find({ product: req.params.id });
        if (!reviews) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.send(reviews);
    }
    catch(error){
        res.send(error);
    }
}

async function HandlePostReviews(req, res) {
    try {
        const { productId, user, email, message } = req.body;

        // Validate required fields
        if (!productId || !user || !email) {
            return res.status(400).json({
                message: "Missing required fields: productId, user, and email are required.",
            });
        }

        // Create a new review
        const newReview = await Reviews.create({
            product: productId, // Assign the productId from the request body
            user,
            email,
            message
        });

        return res.status(201).json({
            message: "Review submitted successfully!",
            review: newReview,
        });
    } catch (error) {
        console.error("Error creating review:", error);

        return res.status(500).json({
            message: "Failed to submit the review. Please try again later.",
            error: error.message, // Include error message for debugging (remove in production)
        });
    }
}


module.exports={
    HandleGetReviews,
    HandlePostReviews
}