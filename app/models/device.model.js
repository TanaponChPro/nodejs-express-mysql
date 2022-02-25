const connDB = require("./db.js");

// constructor
const Device = function (device) {
    this.SerialNo = device.SerialNo;
    this.Band = device.Band;
    this.Model = device.Model;
    this.DeviceType = device.DeviceType;
    this.RegisterDate = device.RegisterDate;
    this.ExpriedDate = device.ExpriedDate;
    this.UseStatus = device.UseStatus;
    this.Lot = device.Lot;
    this.StockName = device.StockName;
    this.WhereIsLast = device.WhereIsLast;
    this.Remark = device.Remark;
};

Device.create = (newDevice, result) => {
    connDB.query("INSERT INTO `EakWServerDB`.`Device` SET ?", newDevice, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created new Device Sussecc: ", { id: res.insertId, ...newDevice });
        result(null, { id: res.insertId, ...newDevice });
    });
};

Device.getAll = (department, result) => {
    let query = "SELECT * FROM `EakWServerDB`.`Device`";

    if (department) {
        query += " WHERE Department LIKE '%${department}%'";
    }

    connDB.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Device: ", res);
        result(null, res);
    });
};

Device.findById = (id, result) => {
    connDB.query("SELECT * FROM `EakWServerDB`.`Device` WHERE id = ${id}", (err, res) => {
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

Device.updateById = (id, device, result) => {
    let query = "UPDATE `EakWServerDB`.`Device` SET Band = ?, Model = ?, DeviceType = ?, "
    query += " RegisterDate = ?, ExpriedDate = ?, UseStatus = ?, Lot = ?, StockName = ?, "
    query += " WhereIsLast = ?, Remark = ?  WHERE id = ?";

    connDB.query(
        query,
        [
            device.Band, device.Model, device.DeviceType, 
            device.RegisterDate, device.ExpriedDate, device.UseStatus,
            device.Lot, device.StockName, device.WhereIsLast, device.Remark, id
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

            console.log("updated Device: ", { id: id, ...device });
            result(null, { id: id, ...device });
        }
    );
};

Device.remove = (id, result) => {
    connDB.query("DELETE FROM `EakWServerDB`.`Device` WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Device with id: ", id);
        result(null, res);
    });
};

module.exports = Device;
