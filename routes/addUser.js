const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");


router.post("/adduser", (request, response) => {
  const newMember = {
    name: request.body.name,
    mailid: request.body.mailid,
    role: request.body.role,
  };
  if (!newMember.name || !newMember.mailid || !newMember.role) {
    response
      .status(400)
      .json({ message: "Please include name, mailid and role for new user" });
  } else {
    const addUser = `INSERT INTO APIapp.users (username,mailid,role) VALUES("${newMember.name}","${newMember.mailid}","${newMember.role}");`;

    connection.query(addUser, (err, result) => {
      if (err) {
        throw err;
      } else {
        response.status(200).json({ message: "User added successfully" });
      }
    });
  }
});

module.exports = router;