const connDB = require("./db.js");
const JobImportBPS = function (jobimport) {
    this.ID = jobimport.ID;
    this.JobNo = jobimport.JobNo;
    this.DateOut = jobimport.DateOut;
    this.MerchantID = jobimport.MerchantID;
    this.MerchantName = jobimport.MerchantName;
    this.LocationInstall = jobimport.LocationInstall;
    this.DefineInsDate = jobimport.DefineInsDate;
    this.DefineInsTime = jobimport.DefineInsTime;
    this.PromotionStrDate = jobimport.PromotionStrDate;
    this.PromotionEndDate = jobimport.PromotionEndDate;
    this.Vender = jobimport.Vender;
    this.TID = jobimport.TID;
    this.SerialNoEDC = jobimport.SerialNoEDC;
    this.Model = jobimport.Model;
    this.ContactName = jobimport.ContactName;
    this.ContactPhone = jobimport.ContactPhone;
    this.ContactBranch = jobimport.ContactBranch;
    this.ContactBranchPhone = jobimport.ContactBranchPhone;
    this.TID_MULTI = jobimport.TID_MULTI;
    this.MERID_MULTI = jobimport.MERID_MULTI;
    this.TID_DCC = jobimport.TID_DCC;
    this.ORG_MERID_DCC = jobimport.ORG_MERID_DCC;
    this.Line1 = jobimport.Line1;
    this.Line2 = jobimport.Line2;
    this.Line3 = jobimport.Line3;
    this.Remark = jobimport.Remark;
    this.ReaderType = jobimport.ReaderType;
    this.AssignTo = jobimport.AssignTo;
    this.SerialNoPinpad = jobimport.SerialNoPinpad;
    this.SerialNoBase = jobimport.SerialNoBase;
    this.LinkPOS = jobimport.LinkPOS;
    this.SerialNoSam = jobimport.SerialNoSam;
    this.SerialNoHub = jobimport.SerialNoHub;
    this.VersionEDC = jobimport.VersionEDC;
    this.VersionPinpad = jobimport.VersionPinpad;
    this.NoteBPS = jobimport.NoteBPS;
    this.BussinessGroup = jobimport.BussinessGroup;
    this.ProjectType = jobimport.ProjectType;
    this.JobType = jobimport.JobType;
    this.Province = jobimport.Province;
    this.BKK_UPC = jobimport.BKK_UPC;
    this.SLAStatus = jobimport.SLAStatus;
    this.Bank = jobimport.Bank;
    this.OperationDate = jobimport.OperationDate;
    this.OperationTime = jobimport.OperationTime;
    this.CustomerName = jobimport.CustomerName;
    this.CustomerPhone = jobimport.CustomerPhone;
    this.TechnicName = jobimport.TechnicName;
    this.JobStatus = jobimport.JobStatus;
    this.Remark2 = jobimport.Remark2;
    this.Remark3 = jobimport.Remark3;
    this.ReturnDate = jobimport.ReturnDate;
    this.ReturnTID = jobimport.ReturnTID;
    this.ReturnSIM = jobimport.ReturnSIM;
    this.ReturnSAM = jobimport.ReturnSAM;
    this.NoteOutsource = jobimport.NoteOutsource;
    this.AppointDate = jobimport.AppointDate;
    this.AppointTime = jobimport.AppointTime;
    this.PhonetoCustomerDate = jobimport.PhonetoCustomerDate;
    this.PhonetoCustomerTime = jobimport.PhonetoCustomerTime;
    this.AppointResult = jobimport.AppointResult;
    this.AppointCount = jobimport.AppointCount;
    this.AppointUser = jobimport.AppointUser;
    this.SLADateCount = jobimport.SLADateCount;
    this.SLAMeet1 = jobimport.SLAMeet1;
    this.SLAinstallEDC = jobimport.SLAinstallEDC;
    this.AppointDateCount = jobimport.AppointDateCount;
    this.SLAMeet2 = jobimport.SLAMeet2;
    this.SLAReturnDate = jobimport.SLAReturnDate;
    this.Week1 = jobimport.Week1;
    this.ImageFile = jobimport.ImageFile;
}

JobImportBPS.updateById = (id, jobimport, result) => {
    let sql = "UPDATE `EakWServerDB`.`JobImportBPS` SET "
    // sql += "     `LocationInstall`= ?, "
    // sql += "     `DefineInsDate` = ?,"
    // sql += "     `DefineInsTime` = ?, "
    // sql += "     `PromotionStrDate`= ?,"
    // sql += "     `PromotionEndDate`= ?,"

    sql += "     `SerialNoEDC`= ?,"
    sql += "     `Model`= ?,"
    sql += "     `ContactName`= ?,"
    sql += "     `ContactPhone`= ?,"
    sql += "     `ContactBranch`= ?,"
    sql += "     `ContactBranchPhone`= ?,"

    sql += "     `SerialNoPinpad`= ?,"
    sql += "     `SerialNoBase`= ?,"
    sql += "     `LinkPOS`= ?,"
    sql += "     `SerialNoSam`= ?, "
    sql += "     `SerialNoHub`= ?,"
    sql += "     `VersionEDC`= ?,"
    sql += "     `VersionPinpad`= ?,"
    sql += "     `NoteBPS`= ?,"

    sql += "     `OperationDate`= ?,"
    sql += "     `OperationTime`= ?,"
    sql += "     `CustomerName`= ?,"
    sql += "     `CustomerPhone`= ?,"
    sql += "     `TechnicName`= ?,"
    sql += "     `JobStatus`= ?,"
    sql += "     `Remark2`= ?,"
    sql += "     `Remark3`= ?,"

    sql += "     `ReturnDate`= ?,"
    sql += "     `ReturnTID`= ?,"
    sql += "     `ReturnSIM`= ?,"
    sql += "     `ReturnSAM`= ?,"
    sql += "     `NoteOutsource`= ?,"

    sql += "     `AppointDate`= ?,"
    sql += "     `AppointTime`= ?,"
    sql += "     `PhonetoCustomerDate`= ?,"
    sql += "     `PhonetoCustomerTime`= ?,"
    sql += "     `AppointResult`= ?,"
    sql += "     `AppointCount`= ?,"
    sql += "     `AppointUser`= ?,"

    sql += "     `SLADateCount`= ?,"
    sql += "     `SLAMeet1`= ?,"
    sql += "     `SLAinstallEDC`= ?,"
    sql += "     `AppointDateCount`= ?,"
    sql += "     `SLAMeet2`= ?,"
    sql += "     `SLAReturnDate`= ?,"
    sql += "     `Week1` = ?"
    // sql += "     `ImageFile` = ?"
    sql += " WHERE id = ?;";
    connDB.query(
        sql,
        [
        //     jobimport.ID,
        //     jobimport.JobNo,
        //     jobimport.DateOut,
        //     jobimport.MerchantID,
        //     jobimport.MerchantName,
        //     jobimport.LocationInstall,
        //     jobimport.DefineInsDate,
        //     jobimport.DefineInsTime,
        //     jobimport.PromotionStrDate,
        //     jobimport.PromotionEndDate,
        //     jobimport.Vender,
        //     jobimport.TID,
            jobimport.SerialNoEDC,
            jobimport.Model,
            jobimport.ContactName,
            jobimport.ContactPhone,
            jobimport.ContactBranch,
            jobimport.ContactBranchPhone,
        //     jobimport.TID_MULTI,
        //     jobimport.MERID_MULTI,
        //     jobimport.TID_DCC,
        //     jobimport.ORG_MERID_DCC,
        //     jobimport.Line1,
        //     jobimport.Line2,
        //     jobimport.Line3,
        //     jobimport.Remark,
        //     jobimport.ReaderType,
        //     jobimport.AssignTo,

            jobimport.SerialNoPinpad,
            jobimport.SerialNoBase,
            jobimport.LinkPOS,
            jobimport.SerialNoSam,
            jobimport.SerialNoHub,

            jobimport.VersionEDC,
            jobimport.VersionPinpad,
            jobimport.NoteBPS,
        //     jobimport.BussinessGroup,
        //     jobimport.ProjectType,
        //     jobimport.JobType,
        //     jobimport.Province,
        //     jobimport.BKK_UPC,
        //     jobimport.SLAStatus,
        //     jobimport.Bank,

            jobimport.OperationDate,
            jobimport.OperationTime,
            jobimport.CustomerName,
            jobimport.CustomerPhone,
            jobimport.TechnicName,
            jobimport.JobStatus,
            jobimport.Remark2,
            jobimport.Remark3,

            jobimport.ReturnDate,
            jobimport.ReturnTID,
            jobimport.ReturnSIM,
            jobimport.ReturnSAM,
            jobimport.NoteOutsource,

            jobimport.AppointDate,
            jobimport.AppointTime,
            jobimport.PhonetoCustomerDate,
            jobimport.PhonetoCustomerTime,
            jobimport.AppointResult,
            jobimport.AppointCount,
            jobimport.AppointUser,

            jobimport.SLADateCount,
            jobimport.SLAMeet1,
            jobimport.SLAinstallEDC,
            jobimport.AppointDateCount,
            jobimport.SLAMeet2,
            jobimport.SLAReturnDate,
            jobimport.Week1,
            // jobimport.ImageFile,
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

            // console.log("updated JobImportBPS: ", { id: id, ...jobimport });
            result(null, { id: id, ...jobimport });
        }
    );
};

module.exports = JobImportBPS;