const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");

router.get("/viewuser/:id", (request, response) => {
    const userIDArray = "SELECT id FROM APIapp.users;";

    connection.query(userIDArray, (err, result) => {
        if (err) {
            throw err;
        } else {
            const members = result;
            console.log(members);
            const found = members.some(
                (member) => member.id === parseInt(request.params.id)
            );

            if (found) {
                const showUserDetails = `SELECT * FROM APIapp.users WHERE id = ${request.params.id};`;

                connection.query(showUserDetails, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        response.status(200).json(result);
                    }
                });
            } else {
                response
                    .status(400)
                    .json({ message: `User not found for id : ` + request.params.id });
            }
        }
    });
});

module.exports = router;