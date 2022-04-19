const express = require("express");
const router = express.Router();
const closejob = require('../controllers/closejob.controller')
// const uploadimage= require("../middlewares/uploadimage.js");

let routes = (app) => {
    // router.get('/', closejob.findAll);
    router.get('/', closejob.JobStatus);
    router.get('/:id', closejob.JobCloseData);
    // router.get('/images', express.static('../images'));
    router.post('/',closejob.CreateCloseJob);
    router.put('/:id',closejob.UpdateCloseJob);
    router.delete("/:id", closejob.DeleteCloseJob);
    // router.post("/uploadphoto", uploadimage.single("uploadfile"), closejob.UploadImage);
    // router.get('/downloadimage', closejob.DownloadImage);
    // app.use('/uploads', express.static('./uploads'));
    app.use('/api/closejob', router);
};

module.exports = routes;