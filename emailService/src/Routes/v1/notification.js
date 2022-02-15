const router = require('express').Router();
const notificationController = require('../../controllers/notification.controllers')

router.post('/',notificationController.sendFollowNotificationEmail)

module.exports = router;