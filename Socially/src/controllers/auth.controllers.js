const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const crypto = require('crypto')





module.exports.register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      emailToken: crypto.randomBytes(64).toString('hex')
    })
    user.save((err, responseObj) => {
      if (err) {
        if (err.code == 11000) {
          res.status(422).send(['Duplicate email address found'])
        }
        else {
          return next(err);

        }
      }
      else {
        res.send({ status: 200, message: 'User registered successfully', results: responseObj });
      }
    })

  }
  catch (err) {
    console.log(err)
  }
}



module.exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token
    const user = await User.findOne({ emailToken: token })
    if (user && !user.isEmailVerified) {
      // user.emailToken =null
      user.isEmailVerified = true
      await user.save()
      res.send("Email verified successfully")
    }
    else
      console.log("verification failed")
    if (user.isEmailVerified)
      res.send("Email already verified")
  } catch (err) {
    console.log(err)
  }
}

module.exports.login = async (req, res) => {
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
}

module.exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token
    const user = await User.findOne({ emailToken: token })
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hashedPassword;
      await user.save()
      res.send("Password reset successfully")
    }
    else
      res.send("Couldn't reset the password")

  } catch (err) {
    console.log(err)
  }
}