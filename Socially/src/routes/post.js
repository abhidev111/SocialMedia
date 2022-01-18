const router = require('express').Router();
const jwtHelper = require('../middlewares/jwtHelper');
const postController = require('../controllers/post.controllers')
const postValidator = require('../validator/postValidator')



router.post("/createPost", postValidator.validatePost, jwtHelper.verifyJwtToken, postController.createPost);

router.delete("/deletePost/:postId", jwtHelper.verifyJwtToken, postController.deletePost);

router.post("/likePost", postValidator.validatePostId, jwtHelper.verifyJwtToken, postController.likePost);

router.post("/addComment", postValidator.validateComment, jwtHelper.verifyJwtToken, postController.addComment);

router.put("/updateComment", jwtHelper.verifyJwtToken, postController.updateComment);

router.get("/getPost", postValidator.validatePostReq, jwtHelper.verifyJwtToken, postController.getPost);

router.get("/getAllPost", postValidator.validatePostReq, jwtHelper.verifyJwtToken, postController.getAllPost);


module.exports = router;