const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excel.controller.js");
const upload = require("../middlewares/upload.js");

let routes = (app) => {
    router.post("/upload", upload.single("uploadfile"), excelController.upload);
    router.get("/jobtacking", excelController.getData);
    app.use('/api/customer', router);
};

module.exports = routes;