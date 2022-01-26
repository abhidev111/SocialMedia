const router = require('express').Router();
const photoController = require('../controllers/photo.controller')
const path = require('path')
// const delController = require('../controllers/photoDelete.controller')
// const Multer = require('../middlewares/multer')
const Multer = require('multer');


const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }, fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
        cb(null,false)
      cb('Error: Images Only!');
      
    }
  }



router.post('/upload', multer.single('file'), photoController.photoUpload);

router.delete('/delete',photoController.deletePhoto)

module.exports = router;