module.exports = app => {
    const device = require("../controllers/device.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", device.create);

    // Retrieve all Tutorials
    router.get("/", device.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", device.findOne);

    // Update a Tutorial with id
    router.put("/:id", device.update);

    // Delete a Tutorial with id
    router.delete("/:id", device.delete);

    app.use('/api/device', router);
};