module.exports = app => {
    const jobStatus = require("../controllers/dashb-jobstatus.controller.js");

    var router = require("express").Router();

    router.get("/", jobStatus.findAll);

    app.use('/api/alljobstatus', router);
};

// const express = require("express");
// const router = express.Router();
// const jobStatus = require('../controllers/dashb-jobstatus.controller')

// let routes = (app) => {
//     // router.get('/', jobStatus.findAll);
//     // router.get('/jobstatus', jobStatus.JobStatus1);
//     router.get('/alljobstatus', jobStatus.getAll);
//     app.use('/api', router);
// };

// module.exports = routes;