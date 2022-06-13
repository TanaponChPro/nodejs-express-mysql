const Bank = require("../models/bank.model.js");

exports.findBankAll = (req, res) => {
    // console.log('xxxxx')
    Bank.getBankAll(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findJobType = (req, res) => {
    // console.log('xxxxx')
    Bank.getJobType(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findJobStatus = (req, res) => {
    // console.log('xxxxx')
    Bank.getJobStatus(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findVender = (req, res) => {
    // console.log('xxxxx')
    Bank.getVender(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

