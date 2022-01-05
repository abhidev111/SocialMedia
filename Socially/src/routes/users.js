const router = require('express').Router();
const User = require('../models/user.model');
const jwtHelper = require('../config/jwtHelper');
const userController = require('../../src/controllers/user.controllers')
const _ = require('lodash');

console.log("hello")


//get a self profile
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

//update user 
router.put("/:id", async (req, res) => {

})

//delete user


//follow a user 


//unfollow a user

router.get("/users/:id", (req, res) => {
    res.send("router info");
})

router.put("/users/:id", (req, res) => {
    res.send("router info");
})



module.exports = router;
