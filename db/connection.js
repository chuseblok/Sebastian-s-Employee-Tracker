const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",

    user: "root",

    password: "Moloken123",

    database: "employees"
});

connect.connection(function(err) {
    if (err) throw err;
   
});  

module.exports = connection;