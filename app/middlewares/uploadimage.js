const util = require("util");
const multer = require("multer");
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const jobno = req.params.jobno;
        const dir = __basedir + "/app/images/" + jobno;
        
        // console.log(req.params.jobno);
        // console.log(dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
         cb(null, dir);
        // cb(null, __basedir + "/app/images/");
    },
    filename: (req, file, cb) => {
        // console.log(req.params.jobno);
        // console.log(file.originalname);
        // cb(null, file.originalname);
        cb(null, `${req.params.jobno}_${file.originalname}`);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

/* 
       // fs.existsSync(dir, exist => {
        //     if (!exist) {
        //         return fs.mkdirSync(dir, error => cb(error, dir))
        //     }
        // });


import multer from 'multer'
import crypto from 'crypto'
import { extname } from 'path'
import slug from 'slug'
import fs from 'fs'

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.body
      const path = `./uploads/gallery/${id}`
      fs.mkdirSync(path, { recursive: true })
      return cb(null, path)
    },
    filename: (req, file, cb) => {
      const { description } = req.body

      crypto.randomBytes(3, (err, res) => {
        if (err) return cb(err)

        return cb(null, slug(description, { lower: true }) + '_' + res.toString('hex') + extname(file.originalname))
      })
    }
  })
}
*/
/* 
const multer = require('multer')
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  const { userId } = req.body
  const dir = ./uploads/${userId}
  fs.exists(dir, exist => {
  if (!exist) {
    return fs.mkdir(dir, error => cb(error, dir))
  }
  return cb(null, dir)
  })
},
filename: (req, file, cb) => {
  const { userId } = req.body
  cb(null, UserId-${userId}-Image-${Date.now()}.png)
}
})

const upload = multer({ storage })
*/
/*
var fs = require('fs');
var dir = './tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var fs = require('fs');

const dir = './database/temp';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

*/