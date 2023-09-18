const db = require("../util/db");
const candidatos = require("./CandidatosDB");

const verificarCandidaturaExistente = async function (usuario_id, vaga_id) {
  return new Promise(async (resolve) => {
    const candidato_id = await candidatos.listarCandidatoIdPorUsuarioId(
      usuario_id
    );
    console.log(candidato_id);

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
