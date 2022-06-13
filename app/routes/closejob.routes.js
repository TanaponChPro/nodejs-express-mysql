const express = require("express");
const router = express.Router();
const closejobControl = require('../controllers/closejob.controller')
// const uploadimage= require("../middlewares/uploadimage.js");

let routes = (app) => {
    // router.get('/', closejob.findAll);
    router.get('/', closejobControl.JobStatus);
    router.get('/:id', closejobControl.JobCloseData);
    // router.get('/images', express.static('../images'));
    router.post('/',closejobControl.CreateCloseJob);
    router.put('/:id',closejobControl.UpdateCloseJob);
    router.delete("/:id", closejobControl.DeleteCloseJob);
    // router.post("/uploadphoto", uploadimage.single("uploadfile"), closejob.UploadImage);
    // router.get('/downloadimage', closejob.DownloadImage);
    // app.use('/uploads', express.static('./uploads'));
    app.use('/api/closejob', router);
};

module.exports = routes;