const router = require('express').Router();
const User = require('../models/user.model');
const jwtHelper = require('../middlewares/jwtHelper');
const userController = require('../../src/controllers/user.controllers')
const _ = require('lodash');

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
router.put("/addFollowRequest", jwtHelper.verifyJwtToken, userController.addFollowRequest)

//accept follow request
router.put("/acceptFollowRequest", jwtHelper.verifyJwtToken, userController.acceptRequest)

//unfollow a user
router.put("/rejectRequest", jwtHelper.verifyJwtToken, userController.rejectRequest)

router.put("/blockUser", jwtHelper.verifyJwtToken, userController.blockUser)

router.put("/unBlockUser", jwtHelper.verifyJwtToken, userController.unBlockUser)

router.put("/unfollow", jwtHelper.verifyJwtToken, userController.removeFollowers)

router.put("/unfollow", jwtHelper.verifyJwtToken, userController.removeFollowers)

router.put("/unfollow", jwtHelper.verifyJwtToken, userController.removeFollowers)
//friend suggestion will be implemented later ..still seaching a better method for it.

module.exports = router;
