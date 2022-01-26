const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: "sociallyimagestorage",
  keyFilename: "sociallyimagestorage-firebase-adminsdk-wzxqo-0d187d1d64.json"
});

const bucket = storage.bucket("gs://sociallyimagestorage.appspot.com");


module.exports.photoUpload = async (req, res,err) => {
  // if(err){
  //   res.status(422).json("nooo")
  // }
  let file = req.file;

  if (file) {
    try {
      const result = await uploadImageToStorage(file);
      res.status(200).send({
        status: 'success',
        result: result
      });
    } catch (error) {
      console.log(error)
      res.status(304).send({
        status: 'failure',
        info: 'Something went wrong'
      });
    }
  }
  else {
    res.status(304).send({
      status: 'failure',
      info: 'no file found'
    });
  }
}

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `photo_${Date.now()}`;

    let fileUpload = bucket.file(newFileName); //uploading

    const blobStream = fileUpload.createWriteStream({

      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      //   const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then(signedUrls => {
        const url = signedUrls[0];
        const result = new Object({
          url: url,
          filename: newFileName
        })
        resolve(result);
      })
      //   resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

module.exports.deletePhoto = (req, res) => {

  const fileRef = bucket.file(req.body.path)
 
  fileRef.delete().then(function () {
    console.log("File Deleted")
    res.status(200).json("Photo deleted successfully")
    
  }).catch(function (error) {
    res.status(503).json('Error occured')
  });
}