const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require('../models/reviewModel');

exports.postReview = catchAsync(async (req,res,next)=>{
    // console.log(req.body);
    const review = await Review.create(req.body);

    res.status(200).json({
        status:'success',
        message:'Review posted successfully',
        review
    })
    next();
});

exports.getReviews = catchAsync(async (req,res,next)=>{
    // console.log(req.body);
    const {category, id} = req.body
    const reviews = await Review.find({ category,id })

    res.status(200).json({
        status:'success',
        reviews
    })
    next();
})