const connDB = require("./db.js");

// constructor
const Employee = function (employee) {
    this.PID = employee.PID;
    this.EmployeeName = employee.EmployeeName;
    this.Department = employee.Department;
    this.RegistDate = employee.RegistDate;
    this.Address1 = employee.Address1;
    this.Address2 = employee.Address2;
    this.LoginName = employee.LoginName;
    this.LoginPassword = employee.LoginPassword;
    this.EmployeeRight = employee.EmployeeRight;
};

Employee.create = (newEmployee, result) => {
    connDB.query("INSERT INTO `EakWServerDB`.`Employee` SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created new Employee Sussecc: ", { id: res.insertId, ...newEmployee });
        result(null, { id: res.insertId, ...newEmployee });
    });
};

Employee.getAll = (department, result) => {
    let query = "SELECT * FROM `EakWServerDB`.`Employee`";

    if (department) {
        query += " WHERE Department LIKE '%${department}%'";
    }

    connDB.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Employee: ", res);
        result(null, res);
    });
};

Employee.findById = (id, result) => {
    connDB.query("SELECT * FROM `EakWServerDB`.`Employee` WHERE id = ${id}", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Employee.updateById = (id, employee, result) => {
    let query = "UPDATE `EakWServerDB`.`Employee` SET EmployeeName = ?, Department = ?, RegistDate = ?, "
    query += " Address1 = ?, Address2 = ?, LoginName = ?, LoginPassword = ?, EmployeeRight = ? "
    query += " WHERE id = ?";

    connDB.query(
        query,
        [
            employee.EmployeeName, employee.Department, employee.RegistDate, 
            employee.Address1, employee.Address2, employee.LoginName,
            employee.LoginPassword, employee.EmployeeRight, id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Employee: ", { id: id, ...employee });
            result(null, { id: id, ...employee });
        }
    );
};

Employee.remove = (id, result) => {
    connDB.query("DELETE FROM `EakWServerDB`.`Employee` WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Employee with id: ", id);
        result(null, res);
    });
};

module.exports = Employee;

/*
insert into `EakWServerDB`.`Employee` (
	`PID`,`EmployeeName`,`Department`,`RegistDate`,
	`Address1`,`LoginName`,`LoginPassword` ,`EmployeeRight`
) VALUES (
	'3100700189932','Mr.Programmer Test','Computer','2022-02-01','Pachasongkhow3 Dingang Bangkok',
	'test','test','1111111111'
);
*/