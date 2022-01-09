const router = require('express').Router();
const authController = require('../../src/controllers/auth.controllers')



router.post("/register", authController.register)  //business logic implemented in auth controller

router.post("/login", authController.login)

router.get("/verify-email",authController.verifyEmail)

router.put("/reset-password",authController.resetPassword)

module.exports = router;