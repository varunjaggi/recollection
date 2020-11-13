const fs = require('fs')
const path = require('path')
const multer = require('multer'); 
const mongoose = require('mongoose')
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

let gfs;
const conn = mongoose.createConnection(process.env.MONGO_URI,{useNewUrlParser: true });
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
           user: req.user
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

module.exports={upload}