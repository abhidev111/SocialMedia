const nodeMailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = "1079049625310-r4gr43gej57igrv6v489qbqon5vcp981.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//043n9Puk54o-CCgYIARAAGAQSNwF-L9IrgBt_a6LgZcsMLh-LZwH6uRGLv_yXJg5m-9XXkC0nOa72VZ595vGuCV_yHTAPk313LcA"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const accessToken = oAuth2Client.getAccessToken()


var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "sociallyblore@gmail.com",
        pass: process.env.PASSWORD, 
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
})
module.exports.sendEmail = async (req, res, next) => {
var mailOptions ={
    from : ' "Socially" <sociallyblore@gmail.com> ',
    to : req.body.email,
    subject : 'Socially -verify your email',
    html : `<h3> Hi ${req.body.fullName}, Thanks for registering with us. </h3> <h4>Please verify mail to continue..</h4> <a href="http://localhost:3000/auth/verify-email?token=${req.body.emailToken}">Click to verify your email</a>`
  }

  transporter.sendMail(mailOptions, (err,info)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(info)
      res.status(200).send("mail sent sucessfully")
    }
  })

}