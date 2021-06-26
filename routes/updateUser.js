const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");


router.put("/updateuser/:id", (request, response) => {
    const userIDArray = "SELECT id FROM APIapp.users;";

    connection.query(userIDArray, (err, result) => {
        if (err) {
            throw err;
        } else {
            const members = result;
            const found = members.some(
                (member) => member.id === parseInt(request.params.id)
            );
            const name = request.body.name;
            const mailid = request.body.mailid;
            const role = request.body.role;
            if (found) {
                let updateDetails = "undefined";
                if (name) {
                    if (mailid) {
                        if (role) {
                            updateDetails = `UPDATE APIapp.users SET username = "${name}", mailid = "${mailid}", role = "${role}" WHERE id = ${request.params.id};`;
                        } else {
                            updateDetails = `UPDATE APIapp.users SET username = "${name}", mailid = "${mailid}" WHERE id = ${request.params.id};`;
                        }
                    } else if (role) {
                        updateDetails = `UPDATE APIapp.users SET username = "${name}", role = "${role}" WHERE id = ${request.params.id};`;
                    } else {
                        updateDetails = `UPDATE APIapp.users SET username = "${name}" WHERE id = ${request.params.id};`;
                    }
                } else if (mailid) {
                    if (role) {
                        updateDetails = `UPDATE APIapp.users SET mailid = "${mailid}", role = "${role}" WHERE id = ${request.params.id};`;
                    } else {
                        updateDetails = `UPDATE APIapp.users SET mailid = "${mailid}" WHERE id = ${request.params.id};`;
                    }
                } else if (role) {
                    updateDetails = `UPDATE APIapp.users SET role = "${role}" WHERE id = ${request.params.id};`;
                }
                if (name || role || mailid) {
                    connection.query(updateDetails, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            response
                                .status(200)
                                .json({ message: "Database updated successfully" });
                        }
                    });
                } else {
                    response.status(400).json({
                        message:
                            "Please provide atleast one parameter from name, mailid and role to update.",
                    });

                }
            } else {
                response
                    .status(400)
                    .json({ message: `User not found for id : ` + request.params.id });
            }
        }
    });
});

module.exports = router;