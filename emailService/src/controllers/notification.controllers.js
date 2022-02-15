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

module.exports.sendFollowNotificationEmail = async (req, res, next) => {
    var mailOptions = {
      from: ' "Socially" <sociallyblore@gmail.com> ',
      to: req.body.email,
      subject: 'New Follow request on Socially',
      html: `<h3> Hi ${req.body.fullName}, There is a new follow request from ${req.body.username}`
    }
  
    try {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
          res.send({"status":false,"message":"couldn't send the mail"})
        }
        else {
          console.log(info)
          res.status(200).send({"status":true,"message":"mail sent sucessfully"})
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }