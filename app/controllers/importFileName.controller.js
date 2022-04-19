const ImportFileName = require("../models/importFileName.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a ImportFileName
    const impFN = new ImportFileName({
        ImpFileName: req.body.ImpFileName,
        UserLogin: req.body.UserLogin,
        ImportDate: req.body.ImportDate,
        TrantoJobImport: "N"
    });

    // Save ImportFileName in the database
    ImportFileName.create(impFN, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ImportFileName."
            });
        else res.send(data);
    });
};

// Retrieve all ImportFileNames from the database (with condition).
exports.findAll = (req, res) => {
    const impFN = req.query.ImpFileName;

    ImportFileName.getAll(impFN, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ImportFileNames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ImportFileName.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ImportFileName with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ImportFileName with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findImpFileName = (req, res) => {
    ImportFileName.getImportFileNameByName((err, data) => {
        if (err)
            res.status(500).send({
                message:  err.message || "Some error occurred while retrieving ImportFileNames."
            });
        else res.send(data);
    });
};

exports.findImportFileNamebyStatus = (req, res) => {
    ImportFileName.getImpFileNameByStatus(req.params.tmp, (err, data) => {
        if (err)
            res.status(500).send({
                message:  err.message || "Some error occurred while retrieving ImportFileNames."
            });
        else res.send(data);
    });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    ImportFileName.updateById(
        req.params.id,
        new ImportFileName(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ImportFileName with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ImportFileName with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};