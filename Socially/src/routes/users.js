const router = require('express').Router();
const User = require('../models/user.model');
const jwtHelper = require('../middlewares/jwtHelper');
const userController = require('../../src/controllers/user.controllers')
const _ = require('lodash');
const userValidator = require('../validator/userValidator')

console.log("hello")


//get a self profile
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

//update user 
router.put("/updateProfile/:id", jwtHelper.verifyJwtToken, userController.updateProfile);

//delete a user
router.delete("/deleteProfile/:id", jwtHelper.verifyJwtToken, userController.deleteProfile)

//view other user
router.get("/viewothersProfile/:id", userController.viewOtherAcc)

//follow a user
router.put("/addFollowRequest", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.addFollowRequest)

//accept follow request
router.put("/acceptFollowRequest", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.acceptRequest)

//unfollow a user
router.put("/rejectRequest", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.rejectRequest)

//block a user
router.put("/blockUser", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.blockUser)

//unblock a user
router.put("/unBlockUser", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.unBlockUser)

//unfollow a user
router.put("/unfollow", userValidator.validateFollowRequest, jwtHelper.verifyJwtToken, userController.removeFollowers)


//friend suggestion will be implemented later ..still seaching a better method for it.

module.exports = router;
