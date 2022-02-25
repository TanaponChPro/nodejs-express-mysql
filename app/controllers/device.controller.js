const Device = require('../models/device.model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const device = new Device({
        SerialNo: req.body.SerialNo,
        Band: req.body.Band,
        Model: req.body.Model,
        DeviceType: req.body.DeviceType,
        RegisterDate: req.body.RegisterDate,
        ExpriedDate: req.body.ExpriedDate,
        UseStatus: req.body.UseStatus,
        Lot: req.body.Lot,
        StockName: req.body.StockName, 
        WhereIsLast: req.body.WhereIsLast,
        Remark: req.body.Remark  
    });

    // Save Tutorial in the database
    Device.create(device, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Device."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const serialno = req.query.SerialNo;

    Device.getAll(serialno, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Device."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Device.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Device with id " + req.params.id
                });
            }
        } else res.send(data);
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

    Device.updateById(
        req.params.id,
        new Device(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Device with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Device with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Device.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Device with id " + req.params.id
                });
            }
        } else res.send({ message: `Device was deleted successfully!` });
    });
};