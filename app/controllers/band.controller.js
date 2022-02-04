const Band = require("../models/band.model.js");

// exports.findAll = (req, res) => {
//     Band.getAll(req, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         else res.send(data);
//     });
// }

// Retrieve all band from the database (with condition).
exports.findAll = (req, res) => {
    res.json({ message: "Welcome to api/band." });
};


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const bandname = req.query.bandname;

    Band.getAll(bandname, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// // Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//     const title = req.query.title;

//     Tutorial.getAll(title, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         else res.send(data);
//     });
// };
