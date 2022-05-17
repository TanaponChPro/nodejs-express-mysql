const express = require("express");
const cors = require("cors");

// this function for login and get authen
// const bodyParser = require('body-parser');
// const authRoutes = require('./app/routes/auth');
// const postsRoutes = require('./app/routes/posts');
const errorController = require('./app/controllers/error');
//----------------------------------------

const app = express();
global.__basedir = __dirname;

// var corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());

// this function for login and get authen
    // app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    //     res.setHeader(
    //         'Access-Control-Allow-Headers',
    //         'Content-Type, Accept, X-Custom-Header, Authorization'
    //     );
    //     if (req.method === 'OPTIONS') {
    //         return res.status(200).end();
    //     }
    //     next();
    // });
    // app.use(bodyParser.json());
//----------------------------------------

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

// this function for login and get authen
// app.use('/auth', authRoutes);
// app.use('/post', postsRoutes);
//----------------------------------------

require("./app/routes/auth.js")(app);
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

// app.use(errorController.get404);
// app.use(errorController.get500);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});