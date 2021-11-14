const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const connection = mongoose.connect(process.env.ATLAS_URI);
require('dotenv').config();

const storage =  new GridFsStorage({
 // url: process.env.ATLAS_URI,
  db: connection,
  options: { userNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images'
        };

        resolve(fileInfo);
      });
    });
  }
});

module.exports = multer({ storage: storage });
