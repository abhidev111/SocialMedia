const router = require('express').Router();
const User = require('../models/user.model');
const authController = require('../../src/controllers/auth.controllers')
const bcrypt = require('bcrypt')









router.post("/register", authController.register)  //business logic implemented in auth controller

   
// router.post()


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        //if user not found
        !user && res.status(404).json("User not found")

        //CHECK PASSWORD VALIDITY
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        //if user is valid it responds with a JWT token
        res.status(200).json({ "token": user.generateJwt() });
    }

    catch (err) {
        console.log(err)
    }
})

router.get("/verify-email",authController.verifyEmail)

module.exports = router;