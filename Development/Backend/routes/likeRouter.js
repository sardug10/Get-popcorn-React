const express = require('express');
const authController = require('../controller/authController');
const likeController = require('../controller/likeController');

const router = express.Router();

router.post('/add-liked',authController.protect,likeController.addLike);
router.post('/get-liked',authController.protect, likeController.getLiked);
router.post('/delete-liked',authController.protect,likeController.deleteLiked)

module.exports = router;