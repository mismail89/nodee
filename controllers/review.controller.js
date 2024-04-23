import Review from "../models/review.model.js";
import { errorhandler } from '../middleware/error.js';
import User from "../models/user.model.js";

const Reviewuser = async (req, res, next) => {
    const { id, name, comment, userauth } = req.body;

    try {
        const existingReview = await Review.findOne({ id, name });
        
        if (existingReview !== null) {
            // If a review already exists, return an error
            return res.status(409).json({message: "Review already exists for this product"})
        }

        const newReview = new Review({ id, name, comment, userauth: name + id });
        await newReview.save();
        
        res.status(200).json({ message: "Review saved successfully" });
    } catch (error) {
        next(error); // Forward any errors to the error handling middleware
    }
}

export default Reviewuser;
