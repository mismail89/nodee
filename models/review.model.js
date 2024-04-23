import mongoose from "mongoose";


const Review = mongoose.model('Review',{
    comment:{
        type: String,
        maxlength: 100,
        required: true
    },
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    userauth: {
        type: String,
    }
    
    
})

export default Review;