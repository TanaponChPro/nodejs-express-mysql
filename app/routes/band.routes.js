// module.exports = app => {
//     const bands = require("../controllers/band.controller.js");

//     var router = require("express").Router();

//     // Retrieve all Tutorials
//     router.get("/", bands.findAll);

//     app.use('/api/bands', router);
// }
const express = require("express");
const router = express.Router();
const bands = require("../controllers/band.controller.js");

let routes = (app) => {
    router.get("/", bands.findAll);
    app.use('/api/bands', router);
};

module.exports = routes;