const express = require('express');
const authController = require('../controller/authController');
const reviewController = require('../controller/reviewController');

const router = express.Router();

router.post('/post',authController.protect,reviewController.postReview);
router.post('/get-reviews',authController.protect,reviewController.getReviews);

module.exports = router;