const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql#021"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query('use ipl', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
    connection.query('SHOW TABLES', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
    
    connection.query('CREATE TABLE IF NOT EXISTS a(id INT, name TEXT)', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
    connection.query('INSERT INTO a VALUES (1,"test")', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
    connection.query('SELECT * FROM a', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
    /*
    connection.query('DROP TABLE a', function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
*/
});



