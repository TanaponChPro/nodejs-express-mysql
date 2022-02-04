const sql = require("./db.js");

// constructor
const Band = function (band) {
    this.bandname = band.bandname;
};

Band.getAll = (bandname, result) => {
    let query = "SELECT * FROM Band";

    if (bandname) {
        query += ` WHERE BandName LIKE '%${bandname}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Band: ", res);
        result(null, res);
    });
};

module.exports = Band;