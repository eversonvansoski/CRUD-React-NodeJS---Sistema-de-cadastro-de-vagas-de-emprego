const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "Teste@123458",
  database: "teste_dev_everson",
  ssl: false,
});

module.exports = {
  connection,
};
