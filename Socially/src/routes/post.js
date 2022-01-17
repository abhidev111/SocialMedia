const router = require('express').Router();
const jwtHelper = require('../middlewares/jwtHelper');
const postController = require('../controllers/post.controllers')



router.post("/createPost",jwtHelper.verifyJwtToken ,postController.createPost);

// router.put("/updatePost",jwtHelper.verifyJwtToken,postController.updatePost);

router.delete("/deletePost/:postId",jwtHelper.verifyJwtToken,postController.deletePost);

router.post("/likePost",jwtHelper.verifyJwtToken,postController.likePost);

router.get("/getPost",jwtHelper.verifyJwtToken,postController.getPost);

router.get("/getAllPost",jwtHelper.verifyJwtToken,postController.getAllPost);


module.exports = router;