const postModel = require('../models/post.model')
const photoUpload = require('../PhotoUploadService/controllers/firedb')
const path = require('path')
module.exports.createPost = async(req,res)=>{
    console.log(req.body)
    console.log(req._id ,req.body.userId)
    if(req._id == req.body.userId){
        // `$(req.body.imgToUpload)_$(Date.now())_$(path.extname(req.body.imgToUpload))`
        try {
        const photoURL = await photoUpload.uploadFile('C:/Users/Abhishek K/Desktop/socialMedia/Socially/src/PhotoUploadService/controllers/Screenshot (72).png',"first.png")
        const newPost = new postModel({
            userId : req.body.userId,
            caption : req.body.caption,
            imgURL : photoURL
        });
    
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.log(error)
    }
}
else
    res.status(403).json('U can post only your post');

}

module.exports.updatePost = async(req,res)=>{
    
}

module.exports.deletePost = async(req,res)=>{
    
}

module.exports.likePost = async(req,res)=>{
    
}

module.exports.getPost = async(req,res)=>{
    
}

module.exports.getAllPost = async(req,res)=>{
    
}