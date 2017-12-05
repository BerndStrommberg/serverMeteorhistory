const http = require('http');
const mysql = require('mysql');
const express = require('express');
const url = require('url');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'LostInSpace',
    database: 'meteor'
});

const app = express();
const radius = 0;
function getQueryInRadius(lat, lon) {
    let radiusQuery = `SELECT * FROM meteorexample WHERE (lat BETWEEN ${lat-radius} AND ${lat+radius}) AND (lon BETWEEN ${lon-radius} AND ${lon+radius})`;
    return radiusQuery;
}

const tasks = {
    newMeteorites: {
        name: "newMeteorites",
        accordingQuery: "SELECT * FROM meteorexample"
    }
}

connection.connect((err) => {
    if(err) {
        console.log("Error: " + err);
    }
});

app.get("/", (request, response) => {
    let urlSended = url.parse(request.url, true);
    let query = urlSended.query;
    response.setHeader('Content-Type', 'application/json');

    if (query.task === tasks.newMeteorites.name) {
        console.log("SERVER: Message - excecuting task: \"", query.task, "\"" );

        connection.query(getQueryInRadius(-14.258, -49.15917), (err, rows, fields) => {
            // connection.end();
            console.log("SERVER: Message - query ", tasks.newMeteorites.accordingQuery);
            if(err) {
                console.log("Error: ", err);
            } else {
                console.log("SERVER: Message - query solution: ", rows);

                response.send(JSON.stringify(rows));
            }
        });
    }

});
app.listen(8080);
