const mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    
    
   
}, { timestamps: true }
)


module.exports = mongoose.model('Post', postSchema);

