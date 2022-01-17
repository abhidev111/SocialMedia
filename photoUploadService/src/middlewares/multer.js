const Multer = require('multer');

module.exports.multer = ()=>{
    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
        }
      });
      multer.single('file');
}