const db = require("../util/db");

const listarVagas = async function () {
  return new Promise((resolve) => {
    db.connection.query("select * from vagas", function (err, response) {
      if (err) throw err;
      resolve(response);
    });
  });
};

const listarVagasPorUsuario = async function (usuario_id) {
  return new Promise((resolve) => {
    let query = `
    select v.* from vagas v 
      inner join candidatos_vagas cv on cv.vaga_id = v.id
      inner join candidatos c on c.id = cv.candidato_id and c.usuario_id = ?
    `;
    db.connection.query(query, [usuario_id], function (err, response) {
      if (err) throw err;
      resolve(response);
    });
  });
};

const listarStatusVaga = async function () {
  return new Promise((resolve) => {
    db.connection.query("select * from status_vaga", function (err, response) {
      if (err) throw err;
      resolve(response);
    });
  });
};

const listarRegimesContratacao = async function () {
  return new Promise((resolve) => {
    db.connection.query(
      "select * from regimes_contratacao",
      function (err, response) {
        if (err) throw err;
        resolve(response);
      }
    );
  });
};

const verificarVagaItiva = async function (vaga_id) {
  return new Promise((resolve) => {
    db.connection.query(
      "select * from vagas where status_vaga_id = 1 and id = ?",
      [vaga_id],
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

const incluirCandidatura = async function (candidato_id, vaga_id) {
  return new Promise((resolve) => {
    db.connection.query(
      "insert into candidatos_vagas (candidato_id, vaga_id) values (?, ?)",
      [candidato_id, vaga_id],
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

module.exports = {
  listarVagas,
  listarVagasPorUsuario,
  listarStatusVaga,
  listarRegimesContratacao,
  verificarVagaItiva,
  incluirCandidatura,
};
