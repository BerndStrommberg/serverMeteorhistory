//http://ec2-18-195-17-121.eu-central-1.compute.amazonaws.com:3000/?task=getContent&lat=-1.002&lon=37.150
//http: //ec2-18-195-17-121.eu-central-1.compute.amazonaws.com:8080/?task=createEvent&eventLat=.1002&eventLon=37.15&eventYear=01/01/1994 12:00:00 AM&eventCountryName=Heidepark Soltau&eventDescription=Test&eventLike=0&eventDislike=0&eventNickName=Moritz
// http://ec2-18-195-17-121.eu-central-1.compute.amazonaws.com:8080/?task=createEvent&eventLat=-1.002&eventLon=37.15&eventYear=01/01/1994 12:00:00 20AM&eventCountryName=Heidepark 20Soltau&eventDescription=Test&eventLike=0&eventDislike=0&eventNickName=Moritz

http://ec2-18-195-17-121.eu-central-1.compute.amazonaws.com:8080/?task=createEvent&eventLat=-1.002&eventLon=37.15&eventYear=2017&eventCountryName=HeideparkSoltau&eventDescription=Test&eventLike=0&eventDislike=0&eventNickName=Moritz
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
const port = 8080;
const radius = 0.7;

const tasks = {
    getContent: {
        name: "getContent"
    },
    createEvent: {
        name: "createEvent"
    }
};

function getContent(lat, lon) {
    let query =
        "SELECT * FROM Meteor m LEFT JOIN Event e on (m.lat = e.eventLat and m.lon = e.eventLon) left join Country c on (m.lat=c.countryLat and m.lon=c.countryLon) where m.lat between (" +
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

function createEvent(
    eventLat,
    eventLon,
    eventYear,
    eventCountryName,
    eventDescription,
    eventLike,
    eventDislike,
    eventNickName
) {
    let query =
        "INSERT INTO Event (eventLat, eventLon, eventYear, eventCountryName, eventDescription, eventLike, eventDislike, eventNickName) " +
        "VALUES " +
        "(" +
        eventLat +
        "," +
        eventLon +
        "," +
        eventYear +
        "," +
        eventCountryName +
        "," +
        eventDescription +
        "," +
        eventLike +
        "," +
        eventDislike +
        "," +
        eventNickName +
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
                    console.log("Hallo Meteoriten");
                    response.send(JSON.stringify(rows));
                }
            }
        );
    } else if (query.task === tasks.createEvent.name) {
        connection.query(
            createEvent(
                parseFloat(query.eventLat),
                parseFloat(query.eventLon),
                query.eventYear,
                query.eventCountryName,
                query.eventDescription,
                parseInt(query.eventLike),
                parseInt(query.eventDislike),
                query.eventNickName
            ),
            (err, rows, fields) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    response.send(query.eventNickName + ", Is deiner!");
                    console.log("Hat geklappt!");
                }
            }
        );
    }
});
app.listen(port);
