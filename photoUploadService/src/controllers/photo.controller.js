const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "sociallyimagestorage",
    keyFilename: "sociallyimagestorage-firebase-adminsdk-wzxqo-0d187d1d64.json"
  });

  const bucket = storage.bucket("gs://sociallyimagestorage.appspot.com");
  
 
module.exports.photoUpload = async (req,res)=>{
    let file = req.file;

  if (file) {
    try {
      const url = await uploadImageToStorage(file);
      res.status(200).send({
        status: 'success',
        url: url
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
  
      let fileUpload = bucket.file(newFileName);
  
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
          resolve(url);
        })
        //   resolve(url);
      });
  
      blobStream.end(file.buffer);
    });
  }