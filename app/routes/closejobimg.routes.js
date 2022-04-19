const express = require("express");
const router = express.Router();
const controller = require('../controllers/closejobimage.controller');
let routes = (app) => {
    router.post("/upload/:jobno", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:jobno/:ImageFileName", controller.downloadImages);
    router.get("/image/:jobno", controller.getImageFile);
    router.get("/rename/:jobno/:ImageFileName", controller.deleteImageFile);
    app.use('/api/closejobimg',router);
};
module.exports = routes;

// var publicDir = require('path').join(__dirname,'/public'); 
// app.use(express.static(publicDir)); 
// http://localhost/myapp/public/images/myImage.jpg
// <img alt="Poster" id="poster" src="/images/image-placeholder.png"> 