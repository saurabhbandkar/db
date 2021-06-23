const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('./connectDB')


router.get('/viewusers', (request, response) => {
    connection.query('SHOW TABLES', (err, result) => {
        if (err) {
            throw err;
        } else {
            response.status(200).json(result);
            //console.log(JSON.stringify(result));
        };
    });
});


router.get('/viewalluserstasks', (request, response) => {
    connection.query('SELECT COUNT(*) FROM ipl.matches', (err, result1) => {
        if (err) {
            throw err;
        } else {
            response.status(200).json(result1);
            //console.log(JSON.stringify(result));
        };
    });
});
module.exports = router;