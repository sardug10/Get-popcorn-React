const catchAsync = require("../utils/catchAsync");
const Like  = require('../models/likedModel');

exports.addLike = catchAsync(async (req,res,next)=>{
    // console.log(req.body);
    const likedItem = await Like.create({
        user:req.body.user,
        category:req.body.category,
        item:req.body.item
    });
    res.status(200).json({
        status:'success',
        message:'Item added to favorites successfully',
        likedItem
    })
    next();
});

exports.getLiked = catchAsync(async (req,res,next)=>{
    const likedItems = await Like.find({user:req.body.user, category:req.body.category});

    res.status(200).json({
        status:'success',
        likedItems
    });
    next();
})

exports.deleteLiked = catchAsync(async (req,res,next)=>{
    const {user, category, item} = req.body
    const deletedLikedItem = await Like.deleteOne({user, category, item});

    res.status(200).json({
        status:'success',
        message:'Item deleted successfully',
        deletedLikedItem
    })
})