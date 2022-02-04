const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobtacking.conrtoller");
const upload = require("../middlewares/upload.js");

let routes = (app) => {
    router.post("/uploadjobtacking", upload.single("uploadfile"), jobController.upload);
    router.get("/jobtacking", jobController.getData);
    router.get("/showstring", jobController.showSubString);
    app.use('/api', router);
};

module.exports = routes;