const Employee = require("../models/employee.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const employee = new Employee({
        PID: req.body.PID,
        EmployeeName: req.body.EmployeeName,
        Department: req.body.Department,
        RegistDate: req.body.RegistDate,
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        LoginName: req.body.LoginName,
        LoginPassword: req.body.LoginPassword,
        EmployeeRight: req.body.EmployeeRight
    });

    // Save Tutorial in the database
    Employee.create(employee, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const department = req.query.Department;

    Employee.getAll(department, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employee."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with id " + req.params.id
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

    Employee.updateById(req.params.id, new Employee(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Employee with id " + req.params.id
                });
            }
        } else res.send(data);
    }
    );
};

exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with id " + req.params.id
                });
            }
        } else res.send({ message: `Employee was deleted successfully!` });
    });
};