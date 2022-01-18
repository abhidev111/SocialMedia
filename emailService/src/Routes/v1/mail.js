const router = require('express').Router();
const mailController = require('../../controllers/mail.controllers')

router.post('/',mailController.sendVerifyEmail)

router.post('/reset-password',mailController.sendPasswordResetEmail)

module.exports = router;