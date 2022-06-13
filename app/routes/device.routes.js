module.exports = app => {
    const DeviceControl = require("../controllers/device.controller.js");
    const uploadbps = require("../middlewares/uploadexcelbps.js");

    var router = require("express").Router();
 
    router.post("/", DeviceControl.create); // Create a new Tutorial 
    router.get("/", DeviceControl.findAll);  // Retrieve all Tutorials 
    router.get("/:id", DeviceControl.findOne); // Retrieve a single Tutorial with id  
    router.post("/strainer", DeviceControl.filterDevice);
    router.get("/vender/:vender", DeviceControl.findDevicebyVender);
    router.put("/:id", DeviceControl.update); // Update a Tutorial with id 
    router.delete("/:id", DeviceControl.delete); // Delete a Tutorial with id
    router.post("/uploadinventbps", uploadbps.single("uploadfile"), DeviceControl.Excel_EakwInventoryNode_BPS_Kbank );

    app.use('/api/device', router);
};