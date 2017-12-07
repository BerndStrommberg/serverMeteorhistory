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
const radius = radius;

function getQueryInRadius(lat, lon) {
    console.log("Lat: " + lat + ": " + typeof lat);
    let radiusQuery =
        "SELECT eventDescription FROM events, Country WHERE events.eventLat = Country.lat = " +
        lat +
        " AND events.eventLon = Country.lon = " +
        lon +
        ";";
    return radiusQuery;
}

function getContent(lat, lon) {
    console.log("from lat: " + lat, "lon: ", lon);
    let eventQuery =
        "select country, name, year from Country, events, Meteor" +
        "where events.eventLat BETWEEN (" +
        (lat - radius) +
        " and " +
        (lat + radius) +
        ")" +
        "and     events.eventLon BETWEEN (" +
        (lon - radius) +
        " and " +
        (lon + radius) +
        ")" +
        "and     Country.lat BETWEEN (" +
        (lat - radius) +
        " and " +
        (lat + radius) +
        ")" +
        "and     Country.lon BETWEEN (" +
        (lon - radius) +
        " and " +
        (lon + radius) +
        ")" +
        "and     Meteor.lat BETWEEN (" +
        (lat - radius) +
        " and " +
        (lat + radius) +
        ")" +
        "and     Meteor.lon BETWEEN (" +
        (lon - radius) +
        " and " +
        (lon + radius) +
        ")";

    let test =
        "select * from Country, events, Meteor where events.eventLat BETWEEN (" +
        (lat - radius) +
        ") and ( " +
        (lat + radius) +
        ") and events.eventLon BETWEEN (" +
        (lon - radius) +
        ") and (" +
        (lon + radius) +
        ") and Country.lat BETWEEN (" +
        (lat - radius) +
        ") and (" +
        (lat + radius) +
        ") and Country.lon BETWEEN (" +
        (lon - radius) +
        ") and (" +
        (lon + radius) +
        ") and Meteor.lat BETWEEN (" +
        (lat - radius) +
        ") and (" +
        (lat + radius) +
        ") and Meteor.lon BETWEEN (" +
        (lon - radius) +
        ") and (" +
        (lon + radius) +
        ")";
    return test;
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
        connection.query(
            getContent(parseFloat(query.lat), parseFloat(query.lon)),
            (err, rows, fields) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    response.send(JSON.stringify(rows));
                }
            }
        );
    }
});
app.listen(3000);
