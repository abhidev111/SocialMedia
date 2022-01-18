const router = require('express').Router();
const authController = require('../../src/controllers/auth.controllers')
const authValidator = require('../validator/authValidator')


router.post("/register", authValidator.validateRegisterUser, authController.register) 

router.post("/login", authValidator.validateLoginUser, authController.login)

router.get("/verify-email", authController.verifyEmail)

router.post("/reset-password", authValidator.validateResetPassword, authController.resetPassword)

module.exports = router;