const { param } = require("express/lib/request");
const connDB = require("./db.js");

const JobStatus = function (param) {
    this.JobType =  param.JobType;
    this.JobStatus = param.JobStatus;
    this.CountStatus = param.CountStatus;
};

JobStatus.getAll = (result) => {
    let sql = "";
    sql += " SELECT JobType, JobStatus, COUNT(JobType) AS CountStatus"
    sql += " FROM EakWServerDB.Jobimport"
    sql += " WHERE MONTH(RecordDateTime) = 2"
    sql += " AND JobStatus IS NOT NULL "
    sql += " GROUP BY JobType, JobStatus;"

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("JobStatus: ", res);
        result(null, res);
    });
};

module.exports = JobStatus;