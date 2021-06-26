const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");


const showUsers = "SELECT username FROM APIapp.users;";

router.get("/viewusers", (request, response) => {
    connection.query(showUsers, (err, result) => {
        if (err) {
            throw err;
        } else {
            response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });
});

module.exports = router;