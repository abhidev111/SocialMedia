const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { boolean } = require('webidl-conversions');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Fullname can\'t be empty'
    },
    userName: {
        type: String,
        required: 'Username can\'t be empty',
        min: 4,
        max: 20,
        unique: true,
        trim : true
    },

    email: {
        type: String,
        lowercase :true,
        trim : true
    },
    emailToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Password must be atleast 6 character long']
    },
    profilePicture: {
        type: String,
        default: ""   //here we will store the links of profile photo which are stored in amazon s3 or some remote storage
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    // saltSecret: String,
    description: {
        type: String,
        default: "hey there I am on Socially",
        max: 60
    }

}, { timestamps: true })

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.SECRET_KEY,                   
        { expiresIn: '20m' });          // jwt token expires in 20 min
}

module.exports = mongoose.model('User', userSchema);



