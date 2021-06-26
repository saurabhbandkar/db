const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");



const showAllUsersTasks =
    "SELECT username, task FROM APIapp.users AS users INNER JOIN APIapp.tasks AS tasks ON tasks.userID = users.id";

router.get("/viewalluserstasks", (request, response) => {
    connection.query(showAllUsersTasks, (err, result) => {
        if (err) {
            throw err;
        } else {
            response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });
});

module.exports = router;