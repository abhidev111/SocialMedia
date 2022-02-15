const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        trim: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true
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
    followersRequest: {
        type: Array,
        default: []
    },
    acceptedfollowers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    blockList: {
        type: Array,
        default: []
    },
    // saltSecret: String,
    description: {
        type: String,
        default: "hey there I am on Socially",
        max: 60
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ],
    accountMode: {
        type: String,
        enum: ['PRIVATE', 'PUBLIC'],
        default: 'PUBLIC'
    }

}, { timestamps: true }
)
//email validation 
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail ');

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.SECRET_KEY
        // ,{ expiresIn: '60m' }
    );          // jwt token expires in 20 min
}

module.exports = mongoose.model('User', userSchema);



