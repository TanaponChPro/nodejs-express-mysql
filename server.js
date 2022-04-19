const express = require("express");
const cors = require("cors");
const app = express();

global.__basedir = __dirname;

// var corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Eak and W application." });
});

// Function to serve all static files
// inside public directory.
// app.use(express.static('app')); 
app.use('/images', express.static('app/images'));

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/band.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/importfilename.routes.js")(app);
require("./app/routes/jobtacking.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/device.routes.js")(app);
require("./app/routes/dashb-jobstatus.routes.js")(app);
require("./app/routes/closejob.routes.js")(app);
require("./app/routes/closejobimg.routes.js")(app);
require("./app/routes/jobtackingbps.routes.js")(app);
app.listen();

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});