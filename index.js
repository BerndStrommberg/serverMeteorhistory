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
const radius = 0.8;

function getQueryInRadius(lat, lon) {
    console.log("Lat: " + lat + ": " + typeof lat);
    let radiusQuery =
        "SELECT eventDescription FROM events, Country WHERE eventLat.events = lat.Country = " +
        lat +
        " AND eventLon.events = lon.Country = " +
        lon +
        ";"
    return radiusQuery;
}

function getQueryEventFromYear(lat, lon) {
    console.log("from lat: " + lat, "lon: ", lon);

    let eventQuery =
        "SELECT * FROM test WHERE (lat BETWEEN " +
        (lat - radius) +
        " AND " +
        (lat + radius) +
        ") AND (lon BETWEEN " +
        (lon - radius) +
        " AND " +
        (lon + radius) +
        ")";
    return eventQuery;
}

const tasks = {
    getMeteorites: {
        name: "getMeteorites"
    },
    getEvents: {
        name: "getEvents"
    }
};

connection.connect(err => {
    if (err) {
        console.log("Error: " + err);
    }
});

app.get("/", (request, response) => {
    let urlSended = url.parse(request.url, true);
    let query = urlSended.query;
    console.log(query);
    console.log(query.task + " Type: " + typeof query.task);
    response.setHeader("Content-Type", "application/json");
    if (query.task === tasks.getEvents.name) {
        connection.query(getQueryInRadius(query.lat, query.lon), (err, rows, fields) => {
            if (err) {
                console.log("Error: ", err);
            } else {
                response.send(JSON.stringify(rows));
                response.send("Tschau ihr bitches");
            }
        });
    }

    //for get meteorit
    // if (query.task === tasks.newMeteorites.name) {
    //     console.log('SERVER: Message - excecuting task: "', query.task, '"');

    //     connection.query(
    //         getQueryInRadius(parseFloat(query.lat), parseFloat(query.lon)),
    //         (err, rows, fields) => {
    //             if (err) {
    //                 console.log("Error: ", err);
    //             } else {
    //                 console.log("SERVER: Message - query solution: ", rows);

    //                 response.send(JSON.stringify(rows));
    //             }
    //         }
    //     );
    // }
});
app.listen(3000);
