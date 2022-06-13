const Device = require('../models/device.model');
const connDB = require('../models/db');
const readXlsxFile = require("read-excel-file/node");

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
        Remark: req.body.Remark,
        Bank: req.body.Bank,
        Project: req.body.Project,
        CodeStock: req.body.CodeStock,
        Quarter: req.body.Quarter,
        LastTID: req.body.LastTID,
        LastJobNo: req.body.LastJobNo,
        LastChangeDate: req.body.LastChangeDate
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

exports.findDevicebyVender = (req, res) => {
    const vender = req.params.vender;

    Device.getDevicebyVender(vender, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "findDevicebyVender: Some error occurred while retrieving Device."
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

    Device.updateById(req.params.id, new Device(req.body),(err, data) => {
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
    });
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

exports.Excel_EakwInventoryNode_BPS_Kbank = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let pathfile = __basedir + "/app/inputfilesbps/" + req.file.filename;
        // console.log(pathfile);
        // console.log(req.file.originalname);
        let orgFileName = req.file.originalname;
        await sheetDetail(pathfile, orgFileName, 'loginname');
        res.status(200).send({ message: "upload file to database complete!", status: "1" });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
            status: "0" 
        });
    }
}

function sheetDetail(filePath, tmpFileName, tmpLoginName) {
    let device = new Device({
        SerialNo: null,
        Band: null,
        Model: null,
        DeviceType: null,
        RegisterDate: null,
        ExpriedDate: null,
        UseStatus: null,
        Lot: null,
        StockName: null,
        WhereIsLast: null,
        Remark: null,
        Bank: null,
        Project: null,
        CodeStock: null,
        Quarter: null,
        LastTID: null,
        LastJobNo: null,
        LastChangeDate: null
    });
    readXlsxFile(filePath, { sheet: 'Sheet1' }).then((rows) => {
        // var myString = "string test";
        // var stringLength = myString.length;
        // console.log(stringLength);

        // console.table(rows);
        rows.shift();
        let jobtackings = [];
        let today = new Date();
        let xlx = new Date();
        let temp;
        let letDeviceType;
        let letChangeDate = null;
        let tmpRegisterDate;
        var ir = 0;
        rows.forEach((row) => {
            if ((row[0] === null) && (row[1] === null)) {

            } else {
                temp = row[3].split('_');
                letDeviceType = mapDeviceType(temp);

                xlx = new Date(row[8]);
                if (xlx instanceof Date) {
                    tmpRegisterDate = xlx.toISOString().slice(0, 10)
                }
                if (row[10] === null) {
                    letChangeDate = null;
                } else {
                    xlx = new Date(row[10]);
                    if (xlx instanceof Date) {
                        letChangeDate = xlx.toISOString().slice(0, 10)
                    }
                }

                device.StockName = row[1];
                device.Bank = row[2];
                device.Model = row[3];
                device.DeviceType = letDeviceType;
                device.Project = row[4];
                device.SerialNo = row[5];  
                device.CodeStock = row[6]; 
                device.Quarter = row[7]; 
                device.RegisterDate = tmpRegisterDate;
                device.Status = row[9];
                device.ChangeDate = letChangeDate; //excel column 10
                device.LastTID = row[11]; 
                device.LastJobNo = row[14];

                jobtackings.push([
                    device.SerialNo, device.Band, 
                    device.Model, device.DeviceType, 
                    device.RegisterDate, device.ExpriedDate, 
                    device.Status, device.Lot, 
                    device.StockName, device.WhereIsLast, 
                    device.Remark, device.Bank, 
                    device.Project, device.CodeStock,
                    device.Quarter, device.LastTID, 
                    device.LastJobNo, device.ChangeDate,
                    tmpFileName
                ]);
            }
        });
        console.log(jobtackings);
        let sql = `INSERT INTO EakWServerDB.DeviceBPS (
                SerialNo, Band, Model, DeviceType, RegisterDate, ExpriedDate, UseStatus,
                Lot, StockName, WhereIsLast, Remark, Bank, Project, CodeStock,
                Quarter, LastTID, LastJobNo, LastChangeDate, ImportFileName  ) VALUES  ? 
            ON DUPLICATE KEY UPDATE 
	            StockName = "${device.StockName}",
	            WhereIsLast = "${device.WhereIsLast}",
                Remark = "${device.Remark}",
                LastTID = "${device.LastTID}", 
                LastJobNo = "${device.LastJobNo}",
                LastChangeDate = "${device.LastChangeDate}";
            `;
        connDB.query(sql, [jobtackings], (err, res) => {
            if (err) throw err;
            console.log("INSERT INTO JobTackingBPS from sheet Detail, Number of records inserted: " + res.affectedRows);
        });
    });
};

var mapDeviceType = function (param)  {
    // console.log(param[0]);
    // console.log(param[1]);
    // (param === null) ? '-' : param[1];
    if (param[1] === null || param[1] === undefined ) {
        if(param[0].substring(0,3).toUpperCase() === 'TEL') {
            console.log('TEL');
            return 'TEL';
        } else {
            console.log('EDC');
            return 'EDC';
        }
    } else {
        console.log("Pinpac");
        return (param === null) ? '-' : param[1];
    }

}

exports.filterDevice  = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);
    Device.getFilterDevice(req.body,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id `
                });
            } else {
                res.status(500).send({
                    message: "Error updating Device with id "
                });
            }
        } else res.send(data);
    });
}