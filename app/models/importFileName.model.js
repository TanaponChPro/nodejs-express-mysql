const sql = require("./db.js");

// constructor
const ImportFileName = function (ImpFN) {
    this.ImpFileName = ImpFN.ImpFileName;
    this.UserLogin = ImpFN.UserLogin;
    this.ImportDate = ImpFN.ImportDate;
    this.TrantoJobImport = ImpFN.TrantoJobImport;
};

ImportFileName.create = (newImportFileName, result) => {
    sql.query("INSERT INTO `EakWServerDB`.`ImportFileName` SET ?", newImportFileName, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ImportFileName: ", { id: res.insertId, ...newImportFileName });
        result(null, { id: res.insertId, ...newImportFileName });
    });
};

ImportFileName.findById = (id, result) => {
    sql.query(`SELECT * FROM EakWServerDB.ImportFileName WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found ImportFileName: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ImportFileName with the id
        result({ kind: "not_found" }, null);
    });
};

ImportFileName.getAll = (ImpFileName, result) => {
    let query = "SELECT * FROM EakWServerDB.ImportFileName";

    if (ImpFileName) {
        query += ` WHERE ImpFileName LIKE '%${ImpFileName}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ImportFileNames: ", res);
        result(null, res);
    });
};

ImportFileName.getImpFileName = (ImpFileName, result) => {
    let query = "SELECT * FROM EakWServerDB.ImportFileName WHERE ImpFileName LIKE " `'%${ImpFileName}%'`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ImportFileName: ", res);
        result(null, res);
    });
};

ImportFileName.updateById = (id, ImpFN, result) => {
    sql.query(
        "UPDATE ImportFileName SET ImpFileName = ?, UserLogin = ?, ImportDate = ?, TrantoJobImport = ? WHERE id = ?",
        [ImpFN.ImpFileName, ImpFN.UserLogin, ImpFN.ImportDate, ImpFN.TrantoJobImport, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ImportFileName with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated ImportFileName: ", { id: id, ...ImportFileName });
            result(null, { id: id, ...ImportFileName });
        }
    );
};

module.exports = ImportFileName;