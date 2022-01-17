const postModel = require('../models/post.model')
const path = require('path')
module.exports.createPost = async(req,res)=>{
    console.log(req.body)
    console.log(req._id ,req.body.userId)
    if(req._id == req.body.userId){
        // `$(req.body.imgToUpload)_$(Date.now())_$(path.extname(req.body.imgToUpload))`
        try {
    
        const newPost = new postModel({
            userId : req.body.userId,
            caption : req.body.caption,
            imgURL : req.body.imgURL
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
    console.log(req.body)
    console.log(req._id ,req.body.userId)
    if(req._id == req.body.userId){
        try {
            const post = await postModel.findOneAndDelete({ _id: req.params.postId })
        if(post)
        res.status(200).json({message:"post deleted successfully",deletedPost :post});
        else
        res.status(404).json("post not found")
        } catch (error) {
            console.log(error)
        }
        

    }
    else
        return res.status(403).json("U can delete only your post")
    
}

module.exports.likePost = async(req,res)=>{
    
        try {
            const post = await postModel.findById( req.body.id);
            
            if (!post.likes.includes(req._id)) {
                await post.updateOne({ $push: { likes: req._id } })
                
                res.status(200).json("Liked the post successfully")
            }
            else {
                res.status(403).json("You already liked this Post")
            }
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    
    
    
}

module.exports.getPost = async(req,res)=>{
    
}

module.exports.getAllPost = async(req,res)=>{
    
}