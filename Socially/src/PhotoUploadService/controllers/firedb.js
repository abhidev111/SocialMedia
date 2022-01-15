const firebaseAdmin = require('firebase-admin');
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');


const serviceAccount = require('../../../sociallyimagestorage-firebase-adminsdk-wzxqo-0d187d1d64.json');
const admin  =  firebaseAdmin.initializeApp({
    credential : firebaseAdmin.credential.cert(serviceAccount)
})

const storageRef = admin.storage().bucket(`gs://sociallyimagestorage.appspot.com`);

module.exports.uploadFile = async(path, filename) => {
    const storage = storageRef.upload(path, {
        public: true,
        destination: `/uploads/posts/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });
    return storage[0].metadata.mediaLink;
}

