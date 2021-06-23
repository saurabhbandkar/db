const mysql = require('mysql');

const connectToDB = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mysql#021',
        multipleStatements: true
    });

    connection.connect((err) => {
        if (err) {
            throw err;
        } else {
            console.log('Connected to DB!');
        };
    });
    return connection
};
module.exports = connectToDB();