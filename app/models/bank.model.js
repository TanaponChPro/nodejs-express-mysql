const connDB = require("./db.js");

// constructor
const Bank = function () {
    
};

Bank.getBankAll = (require, result) => {
    let sql = `SELECT * FROM EakWServerDB.Bank`;

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Bank: ", res);
        result(null, res);
    });
};

Bank.getJobType = (require, result) => {
    let sql = `SELECT * FROM EakWServerDB.JobType`;

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Bank: ", res);
        result(null, res);
    });
};

Bank.getJobStatus = (require, result) => {
    let sql = `SELECT * FROM EakWServerDB.JobStatus`;

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Bank: ", res);
        result(null, res);
    });
};

Bank.getVender = (require, result) => {
    let sql = `SELECT * FROM EakWServerDB.Vender`;

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Bank: ", res);
        result(null, res);
    });
};

module.exports = Bank;