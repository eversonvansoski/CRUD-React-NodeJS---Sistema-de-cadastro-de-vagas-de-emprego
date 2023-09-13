const db = require("../util/db");

const criarCadastro = async function (nome, email, senha, tipoId) {
  return new Promise((resolve) => {
    db.connection.query(
      "insert into usuarios (nome, email, senha, tipo_id) values (?, ?, ?, ?)",
      [nome, email, senha, tipoId],
      function (err, response) {
        if (err) throw err;
        if (response) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

const verificaCadastroExistente = async function (email) {
  return new Promise((resolve) => {
    db.connection.query(
      "select email from usuarios where email = ? ",
      [email],
      function (err, response) {
        if (err) throw err;
        if (response.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

module.exports = {
  criarCadastro,
  verificaCadastroExistente,
};
