const router = require('express').Router();
const mailController = require('../../../src/controllers/mail.controllers')

router.post('/',mailController.sendEmail)

module.exports = router;