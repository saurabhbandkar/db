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
    "CREATE TABLE IF NOT EXISTS subtasks (subtaskID INT PRIMARY KEY, subtask VARCHAR(100))";

  connection.query(createSubtasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const createTasks =
    "CREATE TABLE IF NOT EXISTS tasks (taskID INT PRIMARY KEY, task VARCHAR(100), userID INT, subtaskID INT, taskStatus VARCHAR(100), subTaskStatus VARCHAR(100), FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (subtaskID) REFERENCES subtasks(subtaskID) ON DELETE CASCADE)";

  connection.query(createTasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const fillUsers =
    'INSERT INTO users VALUES (1, "Sachin", "sachin@indianteam.com", "admin"),(2, "Sehwag", "sehwag@indianteam.com", "member")';

  connection.query(fillUsers, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });
  const fillSubtasks =
    'INSERT INTO subtasks VALUES (1, "create schema"), (4, "create database"),(2, "install mysql workbench"),(3, "install mysql")';

  connection.query(fillSubtasks, (err, result) => {
    if (err) {
      throw err;
    } else {
      //response.status(200).json(result);
      console.log(JSON.stringify(result));
    }
  });

  const fillTasks =
    'INSERT INTO tasks VALUES (1, "write queries", 1, 3, "open", "open"),(2, "write queries", 1, 4, "open", "open"),(3, "draw diagram", 1, 1, "open", "open"),(4, "draw diagram", 1, 2, "open", "open"),(5, "write queries", 2, 3, "open", "open"),(6, "draw diagram", 2, 1, "open", "open")';

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



router.delete("/deleteuser/:id", (request, response) => {
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
          const showUserDetails = `DELETE FROM APIapp.users WHERE id = ${request.params.id};`;
  
          connection.query(showUserDetails, (err, result) => {
            if (err) {
              throw err;
            } else {
              response.status(200).json({message: 'Member deleted successfully'});
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
