const nodeMailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv');
dotenv.config();


try {
  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
  const accessToken = oAuth2Client.getAccessToken()


  var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  })
} catch (error) {
  console.log(error)
}

module.exports.sendVerifyEmail = async (req, res, next) => {
  var mailOptions = {
    from: ' "Socially" <sociallyblore@gmail.com> ',
    to: req.body.email,
    subject: 'Socially -verify your email',
    html: `<h3> Hi ${req.body.fullName}, Thanks for registering with us. </h3> <p>Please verify mail to continue..</hp> <a href="http://localhost:3000/auth/verify-email?token=${req.body.emailToken}">Click to verify your email</a>`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(info)
      res.status(200).send("mail sent sucessfully")
    }
  })
}

  module.exports.sendPasswordResetEmail = async (req, res, next) => {
    var mailOptions = {
      from: ' "Socially" <sociallyblore@gmail.com> ',
      to: req.body.email,
      subject: 'Socially -Reset your password',
      html: `<h3> Hi ${req.body.fullName}, You have requested for resetting the password. </h3> <p>Please click below link to reset password</hp> <a href="http://localhost:3000/auth/reset-password?token=${req.body.emailToken}">Reset password</a>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(info)
        res.status(200).send("mail sent sucessfully")
      }
    })
  }

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   else {
  //     console.log(info)
  //     res.status(200).send("mail sent sucessfully")
  //   }
  // })

