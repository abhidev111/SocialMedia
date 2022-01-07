const router = require('express').Router();
const mailController = require('../../../src/controllers/mail.controllers')

router.post('/',mailController.sendVerifyEmail)

router.post('/reset-password',mailController.sendPasswordResetEmail)

module.exports = router;