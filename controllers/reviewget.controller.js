import User from "../models/user.model.js";
import Review from "../models/review.model.js";


const totalreviews = async (req,res,next) => {
    const { id } = req.body;
    const review = await Review.find({id})
    res.status(200).json(review)
}
export default totalreviews;