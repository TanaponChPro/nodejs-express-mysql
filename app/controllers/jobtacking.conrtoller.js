const connect = require("../models/db.js");
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path = __basedir + "/app/inputfiles/" + req.file.filename;
        console.log(path);

        sheetTechnician(path);
        sheetVendor(path);
        sheetCloseJob(path);
        res.status(200).send({ message: "upload file to database complete!" });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

const getData = (req, res) => {

    let query = "SELECT * FROM jobtacking";
    connect.query(query, function(err, data, fields) {
        if (err) throw err;
        res.send(data);
    });

    // connect.query(query, function (err, data, fields) {
    //     // if (err) throw err;
    //     if (err)
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     else res.render('user-list', { title: 'User List', userData: data });
    // });

    // const temp = req.query.title;
    // getAll(temp, (err, data) => {
    //     if (err)
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     else res.send(data);
    // });
    // res.json({ message: "Welcome to JobTacking" });
};



function sheetTechnician(filePath) {
    readXlsxFile(filePath, { sheet: '1-ช่างทำงาน' }).then((rows) => {
        //console.table(rows);
        rows.shift();
        let jobtackings = [];
        let today = new Date()
        today.toISOString().split('T')[0]

        rows.forEach((row) => {
            if ((row[0] === null) || (row[1] === null)) {

            } else {
                jobtackings.push([
                    row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], 
                    today, 'onTech','Admin-test', 'JobTacking_0.xlsx', '1-ช่างทำงาน'
                ]);
            }
        });
        console.log(jobtackings);

        let query = "INSERT INTO jobtacking ("
        query += "`JobNumber`,`TID`,`SerialNoEDC`,`SerialNoBase`,`Accessory`,`Remark`,`TechnicName`,`TackDate`,";
        query += "`RecordDateTime`,`LastStatus`,`AdminName`,`ImpFileName`,`SheetName`";
        query += ") VALUES ?";
        connect.query(query, [jobtackings], (err, res) => {
            if (err) throw err;
            console.log("INSERT INTO jobtacking from sheet 1-ช่างทำงาน, Number of records inserted: " + res.affectedRows);
        });
    });
};

function sheetVendor(filePath) {
    readXlsxFile(filePath, { sheet: '2-คืนเครือง-vendor' }).then((rows) => {
        //console.table(rows);
        rows.shift();
        let jobtackings = [];
        let today = new Date()
        today.toISOString().split('T')[0]

        rows.forEach((row) => {
            if ((row[0] === null) || (row[1] === null)) {

            } else {
                let accessory = "battery: " + row[7] + "| AD+AC: " + row[8] + "| สภาพเครือง: " + row[9] + "| ส่ายต่อพวง:" + row[10];
                jobtackings.push([
                    row[1], row[2], row[3], row[4], row[5], row[6], 
                    accessory, today, 'onVender','Admin-test', 'JobTacking_0.xlsx', '2-คืนเครือง-vendor'
                ]);
            }
        });
        //console.log(jobtackings);

        let query = "INSERT INTO jobtacking (`JobNumber`,`TID`,";
        query += "`SerialNoEDC`,`SerialNoBase`,`SerialNoPinpad`,`SerialNoScanner`,";
        query += "`Accessory`,`RecordDateTime`,`LastStatus`,`AdminName`,`ImpFileName`,`SheetName`";
        query += ") VALUES ?";
        connect.query(query, [jobtackings], (err, res) => {
            if (err) throw err;
            console.log("INSERT INTO jobtacking from sheet 2-คืนเครือง-vendor, Number of records inserted: " + res.affectedRows);
        });
    });
};

function sheetCloseJob(filePath) {
    readXlsxFile(filePath, { sheet: '3-ปิดงานช่าง' }).then((rows) => {
        //console.table(rows);
        rows.shift();
        let jobtackings = [];
        let today = new Date()
        today.toISOString().split('T')[0]

        rows.forEach((row) => {
            if ((row[0] === null) || (row[1] === null)) {

            } else {
                var temp = [];
                temp.push(row[0],row[6],row[11],row[27]); //JobNo, ReturnEDC, InstallEDC, ResultCode
                var tmp = temp[0].substring(0,3);
                var rst = temp[3];
                var laststatus = "";
                if (tmp === "DEI" && rst === "1") laststatus = "onTech";
                if (tmp === "DEI" && rst === "2") laststatus = "onShop";
                if (tmp === "INS" && rst === "1") laststatus = "onShop";
                if (tmp === "INS" && rst === "2") laststatus = "onTech";
                if (tmp === "SER" || tmp ==="REL" || tmp === "INI") {
                    if (rst === "1") { //if success
                        if (temp[2]) laststatus = "onShop: " + temp[2].substring(0,5);
                        if (temp[1]) laststatus = "onTech: " + temp[1].substring(0,5);
                    } else {
                        laststatus = "onTech";
                    }
                }

                let accessory = "Good_Return:" + row[5] + "|Pri:" + row[16] + "|Sec:" + row[17] + "|ApprCode:" + row[20] + "|Status:" + row[22] + "|PlanDate:" + row[25] + "|PlanTime:" + row[26];

                jobtackings.push([
                    row[0], row[1], row[2], row[3], row[4],                             // JobNo, TID, Bank, Contact, PhoneNo
                    row[11], row[12], row[13], row[14], row[15],                        // Install_Serial, base, pinpad, scanner, hub
                    row[6], row[7], row[8], row[9], row[10],                            // return_Serial,  base, pinpad, scanner, hub
                    row[18], row[19],                                                   // return sim, install sim
                    row[21], row[23], row[24],                                          // TechnicName, Date, Time,
                    accessory, row[27], row[28], row[29],                               // ResultCode, Remark, Note
                    today, laststatus, 'Admin-test', 'JobTacking_0.xlsx', '3-ปิดงานช่าง'
                ]);
            }
        });
        //console.log(jobtackings);

        let query = "INSERT INTO jobtacking (";
        query += "`JobNumber`,`TID`,`Bank`,`Contact`,`PhoneNo`,";
        query += "`SerialNoEDC`,`SerialNoBase`,`SerialNoPinpad`,`SerialNoScanner`,`SerialNoHub`,";
        query += "`ReturnNoEDC`,`ReturnNoBase`,`ReturnNoPinpad`,`ReturnNoScanner`,`ReturnNoHub`,";
        query += "`SerialNoSim`,`ReturnNoSim`,";
        query += "`TechnicName`,`TackDate`,`TackTime`,";
        query += "`Accessory`,`ResultCode`,`Remark`,`Comment`,";
        query += "`RecordDateTime`,`LastStatus`,`AdminName`,`ImpFileName`,`SheetName`) VALUES ?";

        connect.query(query, [jobtackings], (err, res) => {
            if (err) throw err;
            console.log("INSERT INTO jobtacking from sheet 3-ปิดงานช่าง, Number of records inserted: " + res.affectedRows);
        });
    });
};

const showSubString = (req, res) => {
    let path = __basedir + "/app/inputfiles/JobTacking_1.xlsx";
    readXlsxFile(path, { sheet: '3-ปิดงานช่าง' }).then((rows) => {
        rows.shift();
        //let dumArray = [];
        rows.forEach((row) => {           
            if ((row[0] === null) || (row[1] === null)) {
            } else {
                var temp = [];
                temp.push(row[0],row[6],row[11],row[27]); //JobNo, ReturnEDC, InstallEDC, ResultCode
                var tmp = temp[0].substring(0,3);
                var rst = temp[3];
                // tem = tem.substring(0,3);
                //console.log("JobCode: "+ tmp + ", ResultCode: " + rst+ ", ");
                var laststatus = "";
                if (tmp === "DEI" && rst === "1") laststatus = "onTech";
                if (tmp === "DEI" && rst === "2") laststatus = "onShop";
                if (tmp === "INS" && rst === "1") laststatus = "onShop";
                if (tmp === "INS" && rst === "2") laststatus = "onTech";
                if (tmp === "SER" || tmp ==="REL" || tmp === "INI") {
                    if (rst === "1") { //if success
                        // (temp[1])? console.log("ReturnEDC: "+ temp[1]): console.log("ReturnEDC: -");
                        // (temp[2])? console.log("InstalEDC: "+ temp[2]): console.log("InstalEDC: -");
                        if (temp[2]) laststatus = "onShop: " + temp[2].substring(0,5);
                        if (temp[1]) laststatus = "onTech: " + temp[1].substring(0,5);
                    } else {
                        laststatus = "onTech";
                    }
                }
                console.log("JobCode: "+ tmp + ", ResultCode: " + rst+ ", LastStatus: "+ laststatus);
                //dumArray.push(["{JobCode: "+ tmp + ", ResultCode: " + rst+ ", LastStatus: "+ laststatus+"}"])
            }
        });
    });
    //res.json(dumArray);
    res.status(200).send({ message: "upload file to database complete!" });
};

module.exports = {
    upload,
    getData,
    showSubString,
};

// rows.forEach((row) => {
//     if ((row[0] === '') && (row[1] === '')) {

//     } else {
//         jobtackings.push([ row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],'Programmer-test','JobTacking_0.xlsx','1-ช่างทำงาน' ]);
//     }
// });
        // let length = rows.length;
        // for (let i = 0; i < length; i++) {
        //     if ( (rows[i][0] === "") || (rows[i][1] === "") ) {
        //         jobtackings.push([ i, 'row is blank']);
        //     } else {
        //         jobtackings.push([ i,rows[i][0],rows[i][1],rows[i][2],rows[i][3],rows[i][4],rows[i][5],rows[i][6],rows[i][7], 'Programmer-test', 'JobTacking_0.xlsx', '1-ช่างทำงาน']);
        //     }
        // }

// readXlsxFile(filePath, { sheet: '1-ช่างทำงาน' }).then((rows) => {
//     //console.table(rows);
//     rows.shift();
//     let jobtackings = [];
//     for (i in rows) {
//         let jobtacking = "";
//         for (j in rows[i]) {
//             // console.log(rows[i][j]);
//             jobtacking += rows[i][j] + ","
//         }
//         jobtackings.push([jobtacking]);
//     }
//     console.log(jobtackings);
// });

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
            // });\

//------------ Example 3 – Access Result Object of MySQL SELECT FROM Query via Node.js
            // con.connect(function(err) {
            //     if (err) throw err;
            //     // if connection is successful
            //     con.query("SELECT * FROM students", function (err, result, fields) {
            //       // if any error while executing above query, throw error
            //       if (err) throw err;
            //       // if there is no error, you have the result
            //       // iterate for all the rows in result
            //       Object.keys(result).forEach(function(key) {
            //         var row = result[key];
            //         console.log(row.name)
            //       });

                // Object.keys(fields).forEach(function(key) {
                //     var field = fields[key];
                //     console.log(field)
                // });

            //     });

            /*
const getAll = (param, result) => {
    let query = "SELECT * FROM jobtacking";

    // if (param) {
    //     query += ` WHERE title LIKE '%${param}%'`;
    // }

    connect.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};
            */