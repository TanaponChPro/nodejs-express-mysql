const connect = require("../models/db.js");
const readXlsxFile = require("read-excel-file/node");
const jobimportbps = require("../models/jobimportbps.model.js");

const uploadexcelbps = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let pathfile = __basedir + "/app/inputfilesbps/" + req.file.filename;
        // console.log(pathfile);
        // console.log(req.file.originalname);

        let orgFileName = req.file.originalname;
        await saveImportFileName(orgFileName, 'loginname');
        // getSheet(pathfile, orgFileName, 'loginname');
        await sheetDetail(pathfile, orgFileName, 'loginname');
        res.status(200).send({ message: "upload file to database complete!" });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

function getSheet(filePath, tmpFileName, tmpLoginName) {
    readXlsxFile(filePath, { sheet: 'Sheet1' }).then((rows) => {
        console.table(rows);
        rows.shift();
        rows.forEach((row) => {
            if ((row[0] === null) && (row[1] === null)) {

            } else {

            }
        })
    })
}

function saveImportFileName(tmpFileName, tmpLoginName) {

    let today = new Date()
    let date = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();
    let impDate = year + "-" + month + "-" + date;
    let jobtackings = [tmpFileName, tmpLoginName, impDate, 'N'];
    let sql = "INSERT INTO EakWServerDB.ImportFileName ( `ImpFileName`, `UserLogin`, `ImportDate`, `TrantoJobImport` )  VALUES ( ? )";

    connect.query(sql, [jobtackings], (err, res) => {
        if (err) throw err;
        console.log("INSERT INTO ImportFileName Number of records inserted: " + res.affectedRows);
    });
};

function sheetDetail(filePath, tmpFileName, tmpLoginName) {
    readXlsxFile(filePath, { sheet: 'Sheet1' }).then((rows) => {
        // var myString = "string test";
        // var stringLength = myString.length;
        // console.log(stringLength);

        // console.table(rows);
        rows.shift();
        let jobtackings = [];
        let today = new Date();
        let xlx = new Date();
        var ir = 0;
        rows.forEach((row) => {
            if ((row[0] === null) && (row[1] === null)) {

            } else {
                var JobType = '';
                var JobStatus = '';
                var WhereIsLast = '';
                var temp = [];
                temp.push(row[1], row[10], row[27], row[5], row[6], row[38], row[48]);
                var tmpDateOut = '';
                var tmpInsDate = '';
                ir++

                xlx = new Date(temp[0]);
                if (xlx instanceof Date) {
                    tmpDateOut = xlx.toISOString().slice(0, 10)
                }
                xlx = new Date(temp[3]);
                if (xlx instanceof Date) {
                    tmpInsDate = xlx.toISOString().slice(0, 10)
                }

                JobType = temp[5];
                JobStatus = temp[6];
                WhereIsLast = setWhereIsLast(JobType, JobStatus);
                // console.log('jobtype: ' + JobType + '| jobstatus: ' + JobStatus + '|WhereIsLast: ' + WhereIsLast);

                jobtackings.push([
                    // row[0]
                    ir, row[27], tmpDateOut, row[2], row[3], row[4], tmpInsDate, row[6], row[7], row[8], row[9],
                    row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19],
                    row[20], row[21], row[22], row[23], row[24], row[25], row[26], row[28], row[29],
                    row[30], row[31], row[32], row[33], row[34], row[35], row[36], row[37], row[38], row[39],
                    row[40], row[41], row[42], row[43], row[44], row[45], row[46], row[47], row[48], row[49],
                    row[50], row[51], row[52], row[53], row[54], row[55], row[56], row[57], row[58], row[59],
                    row[60], row[61], row[62], row[63], row[64], row[65], row[66], row[67], row[68], row[69],
                    tmpFileName, 'Sheet1', today, WhereIsLast, 'Import'
                ]);
            }
        });
        // console.log(jobtackings);

        let sql = "INSERT INTO `EakWServerDB`.`JobTackingBPS` (";
        sql += " `RowNo`,`JobNo`,`DateOut`,`MerchantID`,`MerchantName`,`LocationInstall`,`DefineInsDate`,`DefineInsTime`,";
        sql += " `PromotionStrDate`,`PromotionEndDate`,`Vender`,`TID`,`SerialNoEDC`,`Model`,";
        sql += " `ContactName`,`ContactPhone`,`ContactBranch`,`ContactBranchPhone`,";
        sql += " `TID_MULTI`,`MERID_MULTI`,`TID_DCC`,`ORG_MERID_DCC`,`Line1`,`Line2`,`Line3`,";
        sql += " `Remark`,`ReaderType`,`AssignTo`,`SerialNoPinpad`,`SerialNoBase`,"
        sql += " `LinkPOS`,`SerialNoSam`,`SerialNoHub`,`VersionEDC`,`VersionPinpad`,`NoteBPS`,";
        sql += " `BussinessGroup`,`ProjectType`,`JobType`,`Province`,`BKK_UPC`,`SLAStatus`,"
        sql += " `Bank`,`OperationDate`,`OperationTime`,`CustomerName`,`CustomerPhone`,`TechnicName`,`JobStatus`,`Remark2`,`Remark3`,";
        sql += " `ReturnDate`,`ReturnTID`,`ReturnSIM`,`ReturnSAM`,`NoteOutsource`,";
        sql += " `AppointDate`,`AppointTime`,`PhonetoCustomerDate`,`PhonetoCustomerTime`,";
        sql += " `AppointResult`,`AppointCount`,`AppointUser`,`SLADateCount`,`SLAMeet1`,`SLAinstallEDC`,";
        sql += " `AppointDateCount`,`SLAMeet2`,`SLAReturnDate`,`Week1`,";
        sql += " `ImpFileName`,`SheetName`,`RecordDateTime`,`LastStatus`,`RecordStatus`"
        sql += ") VALUES  ? ";
        connect.query(sql, [jobtackings], (err, res) => {
            if (err) throw err;
            console.log("INSERT INTO JobTackingBPS from sheet Detail, Number of records inserted: " + res.affectedRows);
        });
    });
};

const getJobImportBPS = (req, res) => {

    let sql = "SELECT *, DATE_FORMAT(DateOut,'%Y-%m-%d') as DateOut, ";
    sql += " DATE_FORMAT(DefineInsDate ,'%Y-%m-%d') as  DefineInsDate, DATE_FORMAT(OperationDate,'%Y-%m-%d') as OperationDate, ";
    sql += " DATE_FORMAT(AppointDate ,'%Y-%m-%d') as  AppointDate, DATE_FORMAT(PhonetoCustomerDate,'%Y-%m-%d') as PhonetoCustomerDate ";
    sql += " FROM `EakWServerDB`.`JobImportBPS`;";
    // let sql = "SELECT * FROM `EakWServerDB`.`JobTackingBPS`";
    connect.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    })
};

const welcome = (req, res) => {
    res.json({ message: "Welcome to api import data from BPS excel file." });
};

function setWhereIsLast(tmpType, tmpStatus) {
    var tmp = 'unknow';
    // console.log('jobtype: ' + tmpType, ', jobstatus: ' + tmpStatus)
    switch (tmpType.substring(0, 1)) {
        case '1':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onShop'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onStock'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        case '2':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onShop'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onStock'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        case '3':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onShop'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onStock'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        case '4':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onStock'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onShop'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        case '5':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onShop'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onStock'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        case '6':
            if (tmpStatus.trim() == 'Complete') { tmp = 'onShop'; }
            else if (tmpStatus.trim() == 'Incomplete') { tmp = 'onStock'; }
            else { tmp = 'onPrepair/onTech'; };
            break;
        default:
    }
    return tmp;
}

/*----------------------------------------------------- Back-End Section ---------------------------------------------------*/

const ProcessRunBackend = async (req, res) => {
    try {
        let = sql = ""
        sql += " SELECT ImpFileName, DATE_FORMAT(ImportDate,'%Y-%m-%d') AS ImpDate  "
        sql += " FROM `EakWServerDB`.`ImportFileName` "
        sql += " WHERE TrantoJobImport = 'N'"
        const result = await get_mysql_data(sql)
        for (const ir in result) {
            console.log(result[ir].ImpFileName)
            console.log(result[ir].ImpDate)
            let tmpFileName = result[ir].ImpFileName
            let tmpImpDate = result[ir].ImpDate

            let insJobImportResult = await insertJobImportBPS(tmpFileName, tmpImpDate)
            console.log(insJobImportResult)
            let insDeviceResult1 = await insertDevice(tmpFileName, tmpImpDate, 'EDC')
            console.log(insDeviceResult1)
            let insDeviceResult2 = await insertDevice(tmpFileName, tmpImpDate, 'BASE')
            console.log(insDeviceResult2)
            let insDeviceResult3 = await insertDevice(tmpFileName, tmpImpDate, 'PIN')
            console.log(insDeviceResult3)
            let insDeviceResult4 = await insertDevice(tmpFileName, tmpImpDate, 'HUB')
            console.log(insDeviceResult4)
            let insDeviceHis = await insertDeviceHistory(tmpFileName, tmpImpDate, 'EDC')
            console.log(insDeviceHis)
            let updFileImport = await updateFileImport(tmpFileName, tmpImpDate)
            console.log(updFileImport)
            res.status(200).send({ message: "Transfer data to table JobImportBPS complete!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Transfer data to table JobImportBPS uncomplete! " });
    }
}
var get_mysql_data = (sql, place_holder) => {
    //กำหนดให้ return  object Promise รอ
    return new Promise(function (resolve, reject) {
        //รันคำสั่ง SQL
        connect.query(sql, place_holder, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            if (result == null) {
                return reject({ message: "Mysql Error" });
            }
            //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
            resolve(result);
        })
    });
}
var insertJobImportBPS = (pamFileName, pamImpDate) => {
    let = sql = ""
    sql += " INSERT INTO `EakWServerDB`.`JobImportBPS` ( "
    sql += "     `JobNo`,`DateOut`,`MerchantID`,`MerchantName`,`LocationInstall`, "
    sql += "     `DefineInsDate`,`DefineInsTime`,"
    sql += "     `PromotionStrDate`,`PromotionEndDate`, "
    sql += "     `Vender`,`TID`,`SerialNoEDC`,`Model`,`ContactName`,`ContactPhone`,`ContactBranch`,`ContactBranchPhone`, `TID_MULTI`,"
    sql += "     `MERID_MULTI`,`TID_DCC`,`ORG_MERID_DCC`,`Line1`,`Line2`,`Line3`,`Remark`,`ReaderType`, `AssignTo`,`SerialNoPinpad`,"
    sql += "     `SerialNoBase`,`LinkPOS`,`SerialNoSam`,`SerialNoHub`,`VersionEDC`,`VersionPinpad`, `NoteBPS`,`BussinessGroup`,"
    sql += "     `ProjectType`,`JobType`,`Province`,`BKK_UPC`,`SLAStatus`,`Bank`, "
    sql += "     `OperationDate`,`OperationTime`,"
    sql += "    `CustomerName`,`CustomerPhone`,"
    sql += "     `TechnicName`,`JobStatus`,`Remark2`,`Remark3`, `ReturnDate`,`ReturnTID`,`ReturnSIM`,`ReturnSAM`,`NoteOutsource`, "
    sql += "     `AppointDate`,`AppointTime`,"
    sql += "     `PhonetoCustomerDate`,`PhonetoCustomerTime`,"
    sql += "     `AppointResult`,`AppointCount`, `AppointUser`,`SLADateCount`,`SLAMeet1`,"
    sql += "     `SLAinstallEDC`,`AppointDateCount`,`SLAMeet2`,`SLAReturnDate`,`Week1`"
    sql += " )"
    sql += " SELECT  `JobNo`,CONVERT(`DateOut`, DATE) AS `DateOut`,`MerchantID`,`MerchantName`,`LocationInstall`,"
    sql += "     CONVERT(`DefineInsDate`,DATE) AS `DefineInsDate`,`DefineInsTime`,"

    // sql += "     CONVERT(`PromotionStrDate`,DATE) AS `PromotionStrDate`,"
    sql += "     `PromotionStrDate`,"
    // sql += "     CONVERT(`PromotionEndDate`,DATE) AS `PromotionEndDate`, "
    sql += "     `PromotionEndDate`, "

    sql += "     `Vender`,`TID`,`SerialNoEDC`,`Model`,`ContactName`,`ContactPhone`,`ContactBranch`,`ContactBranchPhone`, `TID_MULTI`,"
    sql += "     `MERID_MULTI`,`TID_DCC`,`ORG_MERID_DCC`,`Line1`,`Line2`,`Line3`,`Remark`,`ReaderType`, `AssignTo`,`SerialNoPinpad`,"
    sql += "     `SerialNoBase`,`LinkPOS`,`SerialNoSam`,`SerialNoHub`,`VersionEDC`,`VersionPinpad`, `NoteBPS`,`BussinessGroup`,"
    sql += "     `ProjectType`,`JobType`,`Province`,`BKK_UPC`,`SLAStatus`,`Bank`, "

//    sql += "     STR_TO_DATE(`OperationDate`,'%Y-%m-%d') AS `OperationDate`,"
    sql += "     if(cast(substr(`OperationDate`,1,2) AS UNSIGNED) > 20, null, SUBSTRING_INDEX(`OperationDate`, ' ', 1)) AS `OperationDate`,"
    sql += "     `OperationTime`,"

    sql += "     `CustomerName`,`CustomerPhone`,"
    sql += "     `TechnicName`,`JobStatus`,`Remark2`,`Remark3`, "
    sql += "     `ReturnDate`,`ReturnTID`,"
    sql += "     `ReturnSIM`,`ReturnSAM`,`NoteOutsource`, "

    // sql += "     CONVERT(`AppointDate`,DATE) AS `AppointDate`,`AppointTime`,"
    sql += "     if(cast(substr(`ReturnDate`,1,2) AS UNSIGNED) > 20, null, SUBSTRING_INDEX(`ReturnDate`, ' ', 1)) AS `ReturnDate`,"
    sql += "     `AppointTime`,"

    // sql += "     CONVERT(`PhonetoCustomerDate`,DATE) AS `PhonetoCustomerDate`,`PhonetoCustomerTime`,"
    sql += "     if(cast(substr(`AppointDate`,1,2) AS UNSIGNED) > 20, null, SUBSTRING_INDEX(`AppointDate`, ' ', 1)) AS `AppointDate`,"
    sql += "     `PhonetoCustomerTime`,"

    sql += "     `AppointResult`,`AppointCount`, `AppointUser`,`SLADateCount`,`SLAMeet1`,"
    sql += "     `SLAinstallEDC`,`AppointDateCount`,`SLAMeet2`,`SLAReturnDate`,`Week1` "
    sql += " FROM `EakWServerDB`.`JobTackingBPS` aa "
    sql += " WHERE ImpFileName LIKE '" + pamFileName + "%' "
    sql += " AND DATE_FORMAT(RecordDateTime,'%Y-%m-%d') = '" + pamImpDate + "'"
    sql += " ON DUPLICATE KEY UPDATE  "
    sql += "     `LocationInstall`= aa.LocationInstall, "
    sql += "     `DefineInsDate` = aa.DefineInsDate,"
    sql += "     `DefineInsTime` = aa.DefineInsTime, "
    sql += "     `PromotionStrDate` = aa.PromotionStrDate,"
    sql += "     `PromotionEndDate` = aa.PromotionEndDate,"
    sql += "     `SerialNoEDC` = aa.SerialNoEDC,"
    sql += "     `Model` = aa.Model,"
    sql += "     `ContactName` = aa.ContactName,"
    sql += "     `ContactPhone`= aa.ContactPhone, "
    sql += "     `ContactBranch` = aa.ContactBranch,"
    sql += "     `ContactBranchPhone` = aa.ContactBranchPhone, "
    sql += "     `SerialNoPinpad` = aa.SerialNoPinpad,"
    sql += "     `SerialNoBase` = aa.SerialNoBase,"
    sql += "     `LinkPOS` = aa.LinkPOS,"
    sql += "     `SerialNoSam` = aa.SerialNoSam, "
    sql += "     `SerialNoHub` = aa.SerialNoHub,"
    sql += "     `VersionEDC` = aa.VersionEDC,"
    sql += "     `VersionPinpad` = aa.VersionPinpad,"
    sql += "     `NoteBPS` = aa.NoteBPS, "
    sql += "     `OperationDate` = aa.OperationDate,"
    sql += "     `OperationTime` = aa.OperationTime,"
    sql += "     `CustomerName` = aa.CustomerName, "
    sql += "     `CustomerPhone` = aa.CustomerPhone,"
    sql += "     `TechnicName` = aa.TechnicName,"
    sql += "     `JobStatus` = aa.JobStatus, "
    sql += "     `Remark2` = aa.Remark2,"
    sql += "     `Remark3` = aa.Remark3,"
    sql += "     `ReturnDate` = aa.ReturnDate,"
    sql += "     `ReturnTID` = aa.ReturnTID, "
    sql += "     `ReturnSIM` = aa.ReturnSIM,"
    sql += "     `ReturnSAM` = aa.ReturnSAM,"
    sql += "     `NoteOutsource` = aa.NoteOutsource, "
    sql += "     `AppointDate` = aa.AppointDate,"
    sql += "     `AppointTime` = aa.AppointTime,"
    sql += "     `PhonetoCustomerDate` = aa.PhonetoCustomerDate, "
    sql += "     `PhonetoCustomerTime` = aa.PhonetoCustomerTime,"
    sql += "     `AppointResult` = aa.AppointResult,"
    sql += "     `AppointCount` = aa.AppointCount, "
    sql += "     `AppointUser` = aa.AppointUser,"
    sql += "     `SLADateCount` = aa.SLADateCount,"
    sql += "     `SLAMeet1` = aa.SLAMeet1,"
    sql += "     `SLAinstallEDC` = aa.SLAinstallEDC, "
    sql += "     `AppointDateCount` = aa.AppointDateCount,"
    sql += "     `SLAMeet2` = aa.SLAMeet2,"
    sql += "     `SLAReturnDate` = aa.SLAReturnDate,"
    sql += "     `Week1` = aa.Week1;"
    return new Promise(function (resolve, reject) {
        connect.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (res == null) {
                return reject({ message: "Data is null" });
            }
            //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
            resolve({ message: "Insert JobImport Complete " });
        })
    });
}
var insertDevice = (pamFileName, pamImpDate, pamDevType) => {
    let = sql = ""
    sql += " INSERT INTO `EakWServerDB`.`DeviceBPS` (SerialNo, DeviceType, Model, UseStatus, StockName, WhereIsLast)"
    sql += " SELECT DISTINCT  "
    if (pamDevType == 'EDC') {
        sql += " aa.SerialNoEDC AS SerialNo, 'EDC' AS DeviceType,"
    } else if (pamDevType == 'BASE') {
        sql += " aa.SerialNoBase AS SerialNo, 'BASE' AS DeviceType,"
    } else if (pamDevType == 'PIN') {
        sql += " aa.SerialNoPinpad AS SerialNo, 'PINPAC' AS DeviceType,"
    } else if (pamDevType == 'HUB') {
        sql += " aa.SerialNoHub AS SerialNo, 'HUB' AS DeviceType,"
    } else {
        sql += " 'SerialNoXXXXX' AS SerialNo,'TMP' AS DeviceType,"
    }
    sql += " aa.Model, 'Y' AS UseStatus, 'EakW-Asok' AS StockName, aa.LastStatus "
    sql += " FROM `EakWServerDB`.`JobTackingBPS` AS aa "
    sql += " WHERE aa.ImpFileName LIKE '" + pamFileName + "%' "
    sql += " AND aa.SerialNoEDC IS NOT NULL "
    sql += " AND aa.SerialNoEDC NOT LIKE  '%ERROR%'  " 
    sql += " AND DATE_FORMAT(aa.RecordDateTime,'%Y-%m-%d') = '" + pamImpDate + "'"

    if (pamDevType == 'BASE') {
        sql += " AND aa.SerialNoBase IS NOT NULL AND aa.SerialNoBase <> '' AND aa.SerialNoBase <> '-'"
    } else if (pamDevType == 'PIN') {
        sql += " AND aa.SerialNoPinpad IS NOT NULL AND aa.SerialNoPinpad <> '' AND aa.SerialNoPinpad <> '-'"
    } else if (pamDevType == 'HUB') {
        sql += " AND aa.SerialNoHub IS NOT NULL AND aa.SerialNoHub <> '' AND aa.SerialNoHub <> '-'"
    } else {
    }

    sql += " ON DUPLICATE KEY UPDATE  "
    sql += " WhereIsLast = aa.LastStatus"
    sql += " ;"
    return new Promise(function (resolve, reject) {
        connect.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (res == null) {
                return reject({ message: "Data is null" });
            }
            //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
            resolve({ message: "Insert/Update data in DeviceBPS, DeviceType = " + pamDevType });
        })
    });
}
var insertDeviceHistory = (pamFileName, pamImpDate, pamDevType) => {
    let = sql = ""
    sql += " INSERT INTO `EakWServerDB`.`DeviceBPSHistory` ("
    sql += "     `SerialNo`,`TID`,`DeviceType`,`TackDateTime`,`LastStatus`,`AdminName`,`TechnicName`,`Activity`)"
    sql += " SELECT SerialNoEDC AS SerialNo, TID, '" + pamDevType + "' AS DeviceType, RecordDateTime AS TackDateTime, "
    sql += " `LastStatus`, 'Tester' AS AdminName, TechnicName, NULL AS Activity"
    sql += " FROM `EakWServerDB`.`JobTackingBPS`"
    sql += " WHERE `ImpFileName` LIKE '" + pamFileName + "%' "
    sql += " AND `SerialNoEDC` IS NOT NULL "
    sql += " AND `SerialNoEDC` NOT LIKE  '%ERROR%'  "
    sql += " AND DATE_FORMAT(`RecordDateTime`,'%Y-%m-%d') = '" + pamImpDate + "'"
    sql += " ;"
    return new Promise(function (resolve, reject) {
        connect.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (res == null) {
                return reject({ message: "Data is null" });
            }
            //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
            resolve({ message: "Insert JobImport Complete " });
        })
    });
}

var updateFileImport = (pamFileName, pamImpDate) => {
    let sql = " UPDATE `EakWServerDB`.`ImportFileName` SET TrantoJobImport = 'Y' "
    sql += " WHERE ImpFileName LIKE '" + pamFileName + "' AND ImportDate = '" + pamImpDate + "';"

    return new Promise(function (resolve, reject) {
        connect.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (res == null) {
                return reject({ message: "Data is null" });
            }
            //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
            resolve({ message: "Insert importfilename Complete " });
        })
    });
}

/*----------------------------------- Create and Update Job from Webpage Section ---------------------------------------------*/
const updateFromPage = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    await jobimportbps.updateById(req.params.id, new jobimportbps(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found JobImportBPS with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating JobImportBPS with id " + req.params.id
                });
            }
        } else res.send(data);
    });

}
module.exports = {
    uploadexcelbps,
    getJobImportBPS,
    welcome,
    ProcessRunBackend,
    updateFromPage
};



/**
 * NodeJS mysql if null or empty
 mysqlConnection.query('SELECT `something` FROM `here` WHERE `dog` = ?', [info] function(err, row, fields) {
  if(err) {
    return console.log('Error1');
  } else if (!row.length) {
    return console.log('Error2');
  } else if (!row[0].something) {
    return console.log('Error3');
  }

  console.log('Works');
});
 */
                // if (xlx instanceof Date) {
                //     tmp = 'is date';// executes, because `x` is technically a date object
                //     tmpDate = xlx.getDate();
                //     tmpMonth = xlx.getMonth();
                //     tmpYear = xlx.getFullYear();
                //     tmpYYMMDD = xlx.toISOString().slice(0, 10)
                // } else {
                //     tmp = 'is not date';
                // }
                // console.log(ir + ': ' + temp[0]);
                // if (xlx instanceof Date && !isNaN(xlx)) {
                //     tmp = 'is date'; // will not execute
                // } else {
                //     tmp = 'is not date';
                // }
                // console.log(ir + ': ' + temp[0] + ' : ' + row[5].value + ' : ' + temp[2] + ' : ' + tmp + ' : ' + tmpDate + tmpMonth + tmpYear+ ':' +tmpYYMMDD);
                // if (tmpStr.length > 500) tmpStr  = tmpStr.substring(0,499);