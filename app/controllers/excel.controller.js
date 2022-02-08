const sql = require("../models/db.js");
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = __basedir + "/app/inputfiles/" + req.file.filename;
        //console.log(path);

        readXlsxFile(path).then((rows) => {
            //console.log(rows);
            rows.shift();

            let customers = [];

            rows.forEach((row) => {
                customers.push([row[1],row[2],row[3]]);
            });

            let query = 'INSERT INTO EakWServerDB.customer (name, address, age) VALUES ?';
            sql.query(query, [customers], (err, res) => {
                if (err) throw err;
                console.log("Number of records inserted: " + res.affectedRows);
                // if (err) {
                //     console.log("error: ", err);
                //     return console.error(err.message);
                // }
                // //console.log("Jobtacking: ", res);
                // else res.status(200).send({ message: "upload file to database complete!" });
            }); 
        });
        res.status(200).send({ message: "upload file to database complete!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

const getData = (req, res) => {
    res.json({ message: "Welcome to JobTacking" });
};

module.exports = {
    upload,
    getData,
};

            // let jobtackings = [];

            // rows.forEach((row) => {
            //     let jobtacking = {
            //         ID: row[0],
            //         JobNumber: row[1],
            //         TID: row[3],
            //         Bank: row[4],
            //         Contact: row[5],
            //         PhoneNo: row[6],
            //         SerialNoEDC: row[7],
            //         SerialNoBase: row[8],
            //         SerialNoPinpad: row[9],
            //         SerialNoScanner: row[10],
            //         SerialNoHub: row[11],
            //         SerialNoSim: row[12],
            //         ReturnNoEDC: row[13],
            //         ReturnNoBase: row[14],
            //         ReturnNoPinpad: row[15],
            //         ReturnNoScanner: row[16],
            //         ReturnNoHub: row[17],
            //         ReturnNoSim: row[18],
            //         Accessory: row[19],
            //         ResultCode: row[20],
            //         Remark: row[21],
            //         RecordDateTime: [22],
            //         TackDate: row[23],
            //         TackTime: row[24],
            //         LastStatus: row[25],
            //         AdminName: row[26],
            //         TechnicName: row[27],
            //         ImpFileName: row[28],
            //         Comment: row[29],
            //         SheetName: row[30]
            //     };
            //     jobtackings.push(jobtacking);
            // });