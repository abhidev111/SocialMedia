const mongoose = require('mongoose')

var postSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        max: 500,
        default: ""
    },
    imgURL: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }

}, { timestamps: true }
)


module.exports = mongoose.model('Post', postSchema);
