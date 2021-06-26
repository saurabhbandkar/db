const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("./connectDB");

router.get("/initializedatabase", (request, response) => {
    const refreshDatabase =
        "DROP DATABASE IF EXISTS APIapp; CREATE DATABASE APIapp; use APIapp;";
    connection.query(refreshDatabase, (err, result) => {
        if (err) {
            throw err;
        } else {
            //console.log(JSON.stringify(result));
        }
    });

    const createUsers =
        "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(255), mailid VARCHAR(255), role VARCHAR(100))";

    connection.query(createUsers, (err, result) => {
        if (err) {
            throw err;
        } else {
            //response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });

    const createSubtasks =
        "CREATE TABLE IF NOT EXISTS subtasks (subtaskID INT PRIMARY KEY, subtask VARCHAR(100))";

    connection.query(createSubtasks, (err, result) => {
        if (err) {
            throw err;
        } else {
            //response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });

    const createTasks =
        "CREATE TABLE IF NOT EXISTS tasks (taskID INT PRIMARY KEY, task VARCHAR(100), userID INT, subtaskID INT, taskStatus VARCHAR(100), subTaskStatus VARCHAR(100), FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (subtaskID) REFERENCES subtasks(subtaskID) ON DELETE CASCADE)";

    connection.query(createTasks, (err, result) => {
        if (err) {
            throw err;
        } else {
            //response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });

    const fillUsers =
        'INSERT INTO users VALUES (1, "Sachin", "sachin@indianteam.com", "admin"),(2, "Sehwag", "sehwag@indianteam.com", "member")';

    connection.query(fillUsers, (err, result) => {
        if (err) {
            throw err;
        } else {
            //response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });
    const fillSubtasks =
        'INSERT INTO subtasks VALUES (1, "create schema"), (4, "create database"),(2, "install mysql workbench"),(3, "install mysql")';

    connection.query(fillSubtasks, (err, result) => {
        if (err) {
            throw err;
        } else {
            //response.status(200).json(result);
            //console.log(JSON.stringify(result));
        }
    });

    const fillTasks =
        'INSERT INTO tasks VALUES (1, "write queries", 1, 3, "open", "open"),(2, "write queries", 1, 4, "open", "open"),(3, "draw diagram", 1, 1, "open", "open"),(4, "draw diagram", 1, 2, "open", "open"),(5, "write queries", 2, 3, "open", "open"),(6, "draw diagram", 2, 1, "open", "open")';

    connection.query(fillTasks, (err, result) => {
        if (err) {
            throw err;
        } else {
            response.status(200).json({ message: "Database Initialized" });
            //console.log(JSON.stringify(result));
        }
    });
});

module.exports = router;