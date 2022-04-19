const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobtackingbps.controller");
const uploadbps = require("../middlewares/uploadexcelbps.js");

let routes = (app) => {
    router.post("/uploadfilebps", uploadbps.single("uploadfile"), jobController.uploadexcelbps );
    router.get("/jobtackingbps", jobController.getJobImportBPS);
    router.get("/bpsjob", jobController.welcome);
    router.get("/bpsrunbackend", jobController.ProcessRunBackend);
    router.put("/bpsupdatefrompage/:id", jobController.updateFromPage);
    app.use('/api', router);
};

module.exports = routes;