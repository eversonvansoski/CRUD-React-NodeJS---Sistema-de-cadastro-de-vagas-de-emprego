const db = require("../util/db");

const verificarCandidaturaExistente = async function (candidato_id, vaga_id) {
  return new Promise((resolve) => {
    db.connection.query(
      "select * from candidatos_vagas where candidato_id = ? and vaga_id = ?",
      [candidato_id, vaga_id],
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
  verificarCandidaturaExistente,
};
