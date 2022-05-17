const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobtackingbps.controller");
const uploadbps = require("../middlewares/uploadexcelbps.js");

let routes = (app) => {
    router.post("/uploadfilebps", uploadbps.single("uploadfile"), jobController.uploadexcelbps );
    router.post("/bpstempjob2realjob", jobController.tranTempJobNo2RealJobNo );
    router.get("/jobtackingbps/:sdate/:edate", jobController.getJobImportBPS);
    router.get("/bpscopyfile/:tjobno/:rjobno", jobController.copyImageTempJobNo2RealJobNo);
    router.get("/bpsjob", jobController.welcome);
    router.get("/bpsrunbackend", jobController.ProcessRunBackend);
    router.put("/bpsupdatefrompage/:id", jobController.updateFromPage);
    app.use('/api', router);
};

module.exports = routes;