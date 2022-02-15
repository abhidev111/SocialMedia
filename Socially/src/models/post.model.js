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
    imgPath: {
        type: String //req for deletion
    }
    ,
    imgURL: {
        type: String //publicly accessible link
    },
    likes: {
        type: Array,
        default: []
    },
    commentsArray: [
        {
            commenter_id: String,
            comment: String
        }
    ]

}, { timestamps: true }
)


module.exports = mongoose.model('Post', postSchema);

