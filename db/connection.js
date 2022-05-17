const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "Moloken123",

  database: "company",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
