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
      console.log(JSON.stringify(result));
    }
  });

  const createUsers =
    "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(255), mailid VARCHAR(255), role VARCHAR(100))";

  connection.query(createUsers, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const createSubtasks =
    "CREATE TABLE IF NOT EXISTS subtasks (subtaskID INT PRIMARY KEY, subtask VARCHAR(100), status VARCHAR(100))";

  connection.query(createSubtasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const createTasks =
    "CREATE TABLE IF NOT EXISTS tasks (taskID INT PRIMARY KEY, task VARCHAR(100), userID INT, subtaskID INT, status VARCHAR(100), FOREIGN KEY (userID) REFERENCES users(id), FOREIGN KEY (subtaskID) REFERENCES subtasks(subtaskID))";

  connection.query(createTasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const fillUsers =
    'INSERT INTO users VALUES (1, "Sachin", "sachin@indianteam.com", "member"),(2, "Sehwag", "sehwag@indianteam.com", "member")';

  connection.query(fillUsers, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });
  const fillSubtasks =
    'INSERT INTO subtasks VALUES (1, "create schema", "open"), (4, "create database", "open"),(2, "install mysql workbench", "open"),(3, "install mysql", "open")';

  connection.query(fillSubtasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const fillTasks =
    'INSERT INTO tasks VALUES (1, "write queries", 1, 3, "open"),(2, "write queries", 1, 4, "open"),(3, "draw diagram", 1, 1, "open"),(4, "draw diagram", 1, 2, "open"),(5, "write queries", 2, 3, "open"),(6, "draw diagram", 2, 1, "open")';

  connection.query(fillTasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      response.status(200).json({ message: "Database Initialized" });
      console.log(JSON.stringify(result));
    }
  });
});

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

const showAllUsersTasks =
  "SELECT username, task, status FROM APIapp.users AS users INNER JOIN APIapp.tasks AS tasks ON tasks.userID = users.id";

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
            //console.log(JSON.stringify(result));
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
