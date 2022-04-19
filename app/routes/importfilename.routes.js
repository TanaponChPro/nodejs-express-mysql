module.exports = app => {
    const ImportFileName = require("../controllers/importFileName.controller.js");

    var router = require("express").Router();

    // Create a new ImportFileName
    router.post("/", ImportFileName.create);

    // Retrieve all ImportFileNames
    router.get("/", ImportFileName.findAll);

    // Retrieve all published ImportFileNames
    router.get("/", ImportFileName.findImpFileName);

    // Retrieve all published ImportFileNames
    router.get("/status/:tmp", ImportFileName.findImportFileNamebyStatus);

    // Retrieve a single ImportFileName with id
    router.get("/:id", ImportFileName.findOne);

    // Update a ImportFileName with id
    router.put("/:id", ImportFileName.update);

    // Delete a ImportFileName with id
    //router.delete("/:id", ImportFileName.delete);

    // Delete all ImportFileNames
    //router.delete("/", ImportFileName.deleteAll);

    app.use('/api/ImportFileName', router);

}