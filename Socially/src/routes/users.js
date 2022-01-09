const router = require('express').Router();
const User = require('../models/user.model');
const jwtHelper = require('../config/jwtHelper');
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
router.put("/follow", jwtHelper.verifyJwtToken, userController.addFollowers)

//unfollow a user
router.put("/unfollow", jwtHelper.verifyJwtToken, userController.removeFollowers)

module.exports = router;
