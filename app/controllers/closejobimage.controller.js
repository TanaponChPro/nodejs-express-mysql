const uploadFile = require('../middlewares/uploadimage');
const fs = require('fs');
const connect = require("../models/db.js");

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        // console.log("Param:" + req.params.jobno);
        let ImgageFileName = req.params.jobno + '_' + req.file.originalname;
        await updJobImportBPS(req.params.jobno, ImgageFileName);

        // let updResult = await updJobImportBPS(req.params.jobno, ImgageFileName);
        // console.log(updResult);

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });

    } catch (err) {
        // res.status(500).send({
        //     message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        // });
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};
const getListFiles = (req, res) => {
    // const baseUrl = req.boby.url;
    // console.log(req.hostname);
    // const imgfileName = "A1032100592_test01.png"
    const baseUrl = 'http://127.0.0.1:8081/';
    const directoryPath = __basedir + "/app/images/";
    console.log(directoryPath);
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({ message: "Unable to scan files!", });
        }
        let fileInfos = [];
        files.forEach((file) => {
            // if (file == imgfileName) {
                fileInfos.push({
                    name: file,
                    url: baseUrl + 'api/closejobimg/files/' + file,
                });
            // }
        });
        res.status(200).send(fileInfos);
    });
};

const getImageFile = (req, res) => {
    // const baseUrl = req.boby.url;
    // console.log(req.hostname);
    const imgJobNo = req.params.jobno;
    const baseUrl = 'http://127.0.0.1:8081/';
    const directoryPath = __basedir + "/app/images/" + imgJobNo  + '/';
    const imgDirectory = `${__basedir}` + `\\app\\images\\${imgJobNo}`;
    
    console.log(imgDirectory);

    let fileInfos = [];

    try {
      if (!fs.existsSync(imgDirectory)) { //เมือเปิดจ็อบมาครั้งแรกยังไม่ได้ไดเร็กทรอรีเก็บ รูปภาพ จะต้องส่งอาเรย์ว่างไปให้หน้าเพจ
        console.log("Directory exists.")
        return res.status(200).send(fileInfos);
      } else {
        console.log("Directory does not exist.")
      }
    } catch(e) {
      console.log("An error occurred.")
    }

    fs.readdir(imgDirectory, function (err, files) {
       
        if (err) {
            return res.status(500).send({ message: "Unable to scan files!", });            
        }
        
        files.forEach((file) => {
            // console.log(file + ': ' + file.substring(0,11) + ': '+ imgJobNo);
            if (file.substring(0, 11) === imgJobNo) {
                fileInfos.push({
                    name: file,
                    url0: baseUrl + 'api/closejobimg/files/' + file,
                    url1: baseUrl + 'images/' + imgJobNo + '/'+ file,
                });
            }
        });
        return res.status(200).send(fileInfos);
    });
};

const downloadImages = (req, res) => {
    const fileName = req.params.ImageFileName;
    const directoryPath = __basedir + "/app/images/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({ message: "Could not download the file. " + err, });
        }
    });
};

var updJobImportBPS = (pamJobNo, pamImageFileName) => {
    let sql = " UPDATE  `EakWServerDB`.`JobImportBPS` SET ImageFile = '" + pamImageFileName + "' "
    sql += " WHERE JobNo = '" + pamJobNo + "';"
    // console.log(sql);
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

const path = require("path");

const deleteImageFile = (req, res) => {
    var imgJobNo = req.params.jobno;
    var fileName = req.params.ImageFileName;
    var directoryPath = __basedir + "/app/images/" + imgJobNo + "/";
    var oldPathFile = directoryPath + fileName;
    var newPathFile =  directoryPath + 'x_' + fileName;
    // console.log('direct: '+directoryPath +', oldfile: '+ oldPathFile +', newfile: '+ newPathFile);

    fs.readFile(oldPathFile, function(err) {
        if (err) {
            return res.status(500).send({ message: "File is empty! Unprocessable Entity."});
        } 
        fs.rename(oldPathFile, newPathFile , function (err) {
            if (err) {
                res.status(500).send({ message: "Unable to scan files!"});
            }
            console.log('File Renamed.');
            res.status(200).send({ message: "File Renamed.!"});
        });
    })



};

module.exports = {
    upload,
    getListFiles,
    downloadImages,
    getImageFile,
    deleteImageFile
};

    // fs.readFile("myFile.txt", function(err, data) {
    //     if (data.length == 0) {
    //         console.log("File is empty!");
    //     } else {
    //         console.log("File is not empty!");
    //     }
    // })

    // try {
    //     fs.rename(oldPathFile, newPathFile, function (error) {
    //         if (error) {
    //             res.status(500).send({ message: "Unable to scan files!"});
    //         }
    //         console.log('File Renamed.');
    //         res.status(200).send({ message: "Successfully renamed the file!", });
    //     })
    // } catch (err) {
    //     throw err
    // }


    // const pathToFile = path.join(__dirname, "your-file.png")
    // const newPathToFile = path.join(__dirname, "new-filename.png")    
    // try {
    //     fs.renameSync(pathToFile, newPathToFile)
    //     console.log("Successfully renamed the file!")
    // } catch (err) {
    //     throw err
    // }

    // delete file
    // fs.unlink('mynewfile2.txt', function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    // });

    // fs.readdir(directoryPath, function (err, files) {
    //     if (err) { 
    //         res.status(500).send({ message: "Unable to scan files!", });
    //     }
    //     let fileInfos = [];
    //     files.forEach((file) => {
    //         // console.log(file + ': ' + file.substring(0,11) + ': '+ imgJobNo);
    //         // if (file.substring(0,11) === imgJobNo) {
    //         //     fileInfos.push({
    //         //         name: file,
    //         //         url: baseUrl + 'api/closejobimg/files/' + file,
    //         //     });
    //         // }
    //     });
    //     res.status(200).send(fileInfos);
    // });