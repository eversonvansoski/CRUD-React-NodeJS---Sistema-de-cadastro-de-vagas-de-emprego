const db = require("../util/db");

const listarUsuarioPorEmail = async function (email) {
  return new Promise((resolve) => {
    db.connection.query(
      "select id, nome, senha, tipo_id from usuarios where email = ?",
      [email],
      function (err, response) {
        if (err) throw err;
        if (response.length > 0) {
          resolve({
            id: response[0].id,
            nome: response[0].nome,
            senha: response[0].senha,
            tipoId: response[0].tipo_id,
          });
        } else {
          resolve({});
        }
      }
    );
  });
};

module.exports = {
  listarUsuarioPorEmail,
};
