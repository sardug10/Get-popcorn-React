const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{
        type:String,
        required:[true,'A review must be from a valid user']
    },
    category:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true
    }
});

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;