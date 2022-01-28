const router = require('express').Router();
const photoController = require('../controllers/photo.controller')

// const delController = require('../controllers/photoDelete.controller')
// const Multer = require('../middlewares/multer')
const Multer = require('multer');


const multer = Multer({
    storage: Multer.memoryStorage()
});

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
        let error = new Error("wrong extension")
      cb(error,'Error: Images Only!');
      
    }
  }



router.post('/upload', multer.single('file'), photoController.photoUpload);

router.delete('/delete',photoController.deletePhoto)

module.exports = router;