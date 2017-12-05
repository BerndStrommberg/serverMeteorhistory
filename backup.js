

let print = function() {
    for (let i = 0; i < 200; i++) {
        console.log("Aktueller Wert: " + i);
    }
}

function doSomething(message, callback) {
    callback();
    console.log(message);
}

doSomething("Fertig!",print);





















// const mysql = require('mysql');
// const http = require('http');
// const url = require('url');
//
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "LostInSpace",
//   database: "meteor"
// });
//
//
// function getAllMeteorsInRange(lat,lon,range) {
//   return con.connect(function(err) {
//     if(err) throw err;
//     console.log("Connected!");
//     let sql = "SELECT * FROM meteorit";
//     return con.query(sql, function (err, result, fields) {
//       if(err) throw err;
//       return(result);
//     });
//   });
// }
//
//
// console.log(getAllMeteorsInRange(40.0000,30.0000,12));
// // http.createServer(function (req,res) {
// //   let currentUrl = req.url;
// //   let info = url.parse(currentUrl,true).query;
// //   let lat = info.lat;
// //   let lon = info.lon;
// //   let range = info.range;
// //   let answer = getAllMeteorsInRange(lat,lon,range);
// //
// //   res.writeHead(200, {'Content-Type': 'text/html'});
// //   res.write(answer);
// //   res.end();
// // }).listen(8080);
