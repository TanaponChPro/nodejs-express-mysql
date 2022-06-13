const { request } = require("express");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
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
    this.Bank = device.Bank;
    this.Project = device.Project;
    this.CodeStock = device.CodeStock;
    this.Quarter = device.Quarter;
    this.LastTID = device.LastTID;
    this.LastJobNo = device.LastJobNo;
    this.LastChangeDate = device.LastChangeDate;
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
    let sql = `SELECT * FROM EakWServerDB.Device`;

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Device: ", res);
        result(null, res);
    });
};

Device.getDevicebyVender = (vender, result) => {
    let sql = `SELECT * FROM EakWServerDB.Device`;

    if (vender == '0') {
        sql = `SELECT * FROM EakWServerDB.Device`;
    } else {
        sql = `SELECT * FROM EakWServerDB.Device${vender}`;
    }

    // console.log("query: ", sql);
    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Device: ", res);
        result(null, res);
    });
};

Device.findById = (id, result) => {
    connDB.query(`SELECT * FROM EakWServerDB.Device WHERE id = ${id}`, (err, res) => {
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
    let sql = `PDATE EakWServerDB.Device SET Band = ?, Model = ?, DeviceType = ?, 
    RegisterDate = ?, ExpriedDate = ?, UseStatus = ?, Lot = ?, StockName = ?, WhereIsLast = ?, Remark = ?,    
    Bank = ?, Project = ?,  CodeStock = ?, LastTID = ?, LastJobNo = ?, LastChangeDate = ?
    WHERE id = ?`;

    connDB.query(
        sql,
        [
            device.Band, device.Model, device.DeviceType,
            device.RegisterDate, device.ExpriedDate, device.UseStatus,
            device.Lot, device.StockName, device.WhereIsLast, device.Remark,
            device.Bank, device.Project, device.CodeStock, device.LastTID, device.LastJobNo, device.LastChangeDate,
            id
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

Device.getFilterDevice = (req, result) => {
    let sql = `SELECT * FROM EakWServerDB.Device `;
    let condi_seq = 0;

    if (req.vender !== null) {
        if(req.vender === 'BPS')
        sql = `SELECT * FROM EakWServerDB.Device${req.vender} `;
    } 
    if (req.strDate !== null) {
        sql += `WHERE RegisterDate BETWEEN '${req.strDate}' AND  '${req.endDate}' `;  
        condi_seq++;
    }
    if (req.Bank !== null) {
        sql += (condi_seq == 0) ? `WHERE Bank = '${req.Bank}'` : ` AND Bank = '${req.Bank}'`;
        condi_seq++;
    }
    if (req.usestatus !== null) {
        sql += (condi_seq == 0) ? `WHERE UseStatus = '${req.usestatus}'` : ` AND UseStatus = '${req.usestatus}'`;
        condi_seq++;
    }
    if (req.stockname !== null) {
        sql += (condi_seq == 0) ? `WHERE StockName = '${req.stockname}'` : ` AND StockName = '${req.stockname}'`;
        condi_seq++;
    }

    console.log("query: ", sql);
    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Device: ", res);
        result(null, res);
    });
};

module.exports = Device;
