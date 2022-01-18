const router = require('express').Router();
const photoController = require('../controllers/photo.controller')
// const delController = require('../controllers/photoDelete.controller')
// const Multer = require('../middlewares/multer')
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});



router.post('/upload', multer.single('file'), photoController.photoUpload);

router.delete('/delete',photoController.deletePhoto)

module.exports = router;