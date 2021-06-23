const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/showdatabases', (request, response) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mysql#021',
        database: 'ipl'
    });
    connection.connect((err) => {
        if (err) {
            throw err;
        } else {
            connection.query('SHOW TABLES', (err, result) => {
                if (err) {
                    throw err;
                } else {
                    response.status(200).json(result);
                    //console.log(JSON.stringify(result));
                };
            });
        };
    });
});

module.exports = router;