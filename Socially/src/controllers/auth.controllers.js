const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const crypto = require('crypto')







module.exports.register = async (req, res, next) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            emailToken : crypto.randomBytes(64).toString('hex')
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



module.exports.verifyEmail = async (req,res)=>{
  try {
    const token = req.query.token
    const user = await User.findOne({ emailToken : token})
    if(user){
      user.emailToken =null
      user.isEmailVerified = true
      await user.save()
      res.send("Email verified successfully")
    }
    else
     console.log("verification failed")
    
    
  } catch (err) {
    console.log(err)
  }
}

module.exports.login = async (req,res)=>{
  
}