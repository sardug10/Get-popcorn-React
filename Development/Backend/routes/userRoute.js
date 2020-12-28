const express = require('express')

const authController = require('../controller/authController')

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.get('/logout',authController.logout);

module.exports = router;