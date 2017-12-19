//http://ec2-18-195-17-121.eu-central-1.compute.amazonaws.com:3000/?task=getContent&lat=-1.002&lon=37.150
const http = require("http");
const mysql = require("mysql");
const express = require("express");
const url = require("url");

const connection = mysql.createConnection({
    host: "meteoritesall.cc2hnkf7p8p9.eu-central-1.rds.amazonaws.com",
    user: "root",
    password: "meteor420!",
    database: "meteorAll"
});

const app = express();
const port = 3000;
const radius = 0.7;

const tasks = {
    getContent: {
        name: "getContent"
    }
};

function getContent(lat, lon) {
    let query =
        "SELECT * FROM Meteor m LEFT JOIN events e on (m.lat = e.eventLat and m.lon = e.eventLon) left join Country c on (m.lat=c.countryLat and m.lon=c.countryLon) where m.lat between (" +
        (lat - radius) +
        ") and (" +
        (lat + radius) +
        ") and m.lon between (" +
        (lon - radius) +
        ") and (" +
        (lon + radius) +
        ")";

    return query;
}

connection.connect(err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("server is running... listen in port: ", port);
    }
});

app.get("/", (request, response) => {
    let urlSended = url.parse(request.url, true);
    let query = urlSended.query;
    response.setHeader("Content-Type", "application/json");
    if (query.task === tasks.getContent.name) {
        connection.query(
            getContent(parseFloat(query.lat), parseFloat(query.lon)),
            (err, rows, fields) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    console.log("Hallo Meteoriten + Country: ", rows);
                    response.send(JSON.stringify(rows));
                    if (err) {
                        console.log(err);
                    }
                }
            }
        );
    }
});
app.listen(port);
