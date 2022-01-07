const router = require('express').Router();
const User = require('../models/user.model');
const authController = require('../../src/controllers/auth.controllers')
const bcrypt = require('bcrypt')









router.post("/register", authController.register)  //business logic implemented in auth controller

router.post("/login", authController.login)

router.get("/verify-email",authController.verifyEmail)

router.post("/reset-password",authController.resetPassword)

module.exports = router;