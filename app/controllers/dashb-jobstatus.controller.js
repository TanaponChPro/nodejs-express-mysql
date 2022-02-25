const JobStatus = require('../models/jobstatus.model');
exports.findAll = (req, res) => {
    // const serialno = req.query.SerialNo;

    JobStatus.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Device."
            });
        else res.send(data);
    });
};

// const connect = require("../models/db.js");
// async function JobStatus(){
// const JobStatus1 = async (req, res) => {
//     var jobstatus;
//     try {
//         jobstatus = await getJobStatusCurrentMonth();
//         // console.log(jobstatus);
//         // console.log((JSON.parse(jobstatus)))
//         res.send(JSON.parse(jobstatus))
//         // res.send(jobstatus)
//         // console.log((JSON.parse(jobstatus))[0].JobType)
//         // for (let ir in jobstatus) {
//         //     console.log(jobstatus[ir].JobType);
//         //     console.log(jobstatus[ir].JobStatus);
//         //     console.log(jobstatus[ir].CountStatus);
//         // }
//         // res.status(200).send({ message: "select JobStatus complete!" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: "Error select JobStatus: " });
//     }
// };


// var getJobStatusCurrentMonth = () => {
//     let sql = "";
//     sql += " SELECT JobType, JobStatus, COUNT(JobType) AS CountStatus"
//     sql += " FROM EakWServerDB.jobimport"
//     sql += " WHERE MONTH(RecordDateTime) = 2"
//     sql += " AND JobStatus IS NOT NULL "
//     sql += " GROUP BY JobType, JobStatus;"

//     return new Promise(function (resolve, reject) {
//         connect.connect(() => {
//             //รันคำสั่ง SQL
//             connect.query(sql, (err, result) => {

//                 if (err) {
//                     console.log(err);
//                     return reject(err);
//                 }

//                 if (result == null) {
//                     return reject({ message: "Mysql Error" });
//                 }
//                 //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
//                 resolve(JSON.stringify(result));
//             })

//         });

//     });
// }

// const findAll = (req, res) => {
//     res.json({ message: "Welcome to api/band." });
// };

// JobStatus.findAllJob = (req, res) => {
//     // const tmpReq = req.query.bandname;

//     findAllJob((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         else res.send(data);
//     });

// };

// var getAll = (result) => {
//     let sql = "";
//     sql += " SELECT JobType, JobStatus, COUNT(JobType) AS CountStatus"
//     sql += " FROM EakWServerDB.jobimport"
//     sql += " WHERE MONTH(RecordDateTime) = 2"
//     sql += " AND JobStatus IS NOT NULL "
//     sql += " GROUP BY JobType, JobStatus;"

//     connect.query(sql, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         // console.log("Band: ", res);
//         result(null, res);
//     });
// };


// module.exports = {
//     JobStatus,
//     JobStatus1,
//     findAll
// };
// module.exports = JobStatus;


