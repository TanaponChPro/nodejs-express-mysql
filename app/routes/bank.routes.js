const express = require("express");
const router = express.Router();
const BankControl = require("../controllers/bank.controller.js");

let routes = (app) => {
    router.get("/bank", BankControl.findBankAll);
    router.get("/jobtype", BankControl.findJobType);
    router.get("/jobstatus", BankControl.findJobStatus);
    router.get("/vender", BankControl.findVender);
    app.use('/api/util', router);
};

module.exports = routes;