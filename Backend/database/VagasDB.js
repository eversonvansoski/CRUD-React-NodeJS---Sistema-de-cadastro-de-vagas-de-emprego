const db = require("../util/db");

const listarVagas = async function (
  titulo = "",
  empresa = "",
  descricao = "",
  status_vaga = "",
  regime_contratacao = "",
  pagina = 1,
  linhasPorPagina = 20
) {
  return new Promise((resolve) => {
    linhasPorPagina = parseInt(linhasPorPagina);
    let offset = (parseInt(pagina) - 1) * linhasPorPagina;

    let query =
      "select v.*, sv.descricao as status, rc.descricao as regime_contratacao from vagas v ";
    query += "inner join status_vaga sv on sv.id = v.status_vaga_id ";
    query +=
      "inner join regimes_contratacao rc on rc.id = v.regime_contratacao_id ";
    query += "where 1=1 ";
    query += titulo == "" ? "/*?*/ " : "and titulo like ? ";
    query += empresa == "" ? "/*?*/ " : "and empresa like ? ";
    query += descricao == "" ? "/*?*/ " : "and v.descricao like ? ";
    query += status_vaga == "" ? "/*?*/ " : "and sv.descricao like ? ";
    query += regime_contratacao == "" ? "/*?*/ " : "and rc.descricao like ? ";
    query += "limit ?  offset ?";

    db.connection.query(
      query,
      [
        "%" + titulo + "%",
        "%" + empresa + "%",
        "%" + descricao + "%",
        "%" + status_vaga + "%",
        "%" + regime_contratacao + "%",
        linhasPorPagina,
        offset,
      ],
      function (err, response) {
        if (err) throw err;
        resolve(response);
      }
    );
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

const cadastrarVaga = async function (
  titulo,
  empresa,
  descricao,
  status_vaga_id,
  regime_contratacao_id
) {
  return new Promise((resolve) => {
    db.connection.query(
      "insert into vagas (titulo, empresa, descricao, status_vaga_id, regime_contratacao_id) values (?, ?, ?, ?, ?);",
      [titulo, empresa, descricao, status_vaga_id, regime_contratacao_id],
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
const excluirVaga = async function (vaga_id) {
  return new Promise((resolve) => {
    let queryCandidatosVagas =
      "delete from candidatos_vagas where vaga_id = ?; ";
    let queryVagas = "delete from vagas where id = ?;";

    db.connection.query(
      queryCandidatosVagas,
      [vaga_id],
      function (err, response) {
        if (err) throw err;
        if (response) {
          db.connection.query(queryVagas, [vaga_id], function (err, response) {
            if (err) throw err;
            if (response) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      }
    );
  });
};

const alterarStatusVaga = async function (vaga_id, status_vaga_id) {
  return new Promise((resolve) => {
    db.connection.query(
      "update vagas set status_vaga_id = ? where id = ?",
      [status_vaga_id, vaga_id],
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

const editarVaga = async function (
  titulo,
  empresa,
  descricao,
  regime_contratacao_id,
  vaga_id
) {
  return new Promise((resolve) => {
    db.connection.query(
      "update vagas set titulo = ?, empresa = ?, descricao = ?, regime_contratacao_id = ? where id = ?",
      [titulo, empresa, descricao, regime_contratacao_id, vaga_id],
      function (err, response) {
        if (err) throw err;
        if (response) {
          console.log(response);
          resolve(true);
        } else {
          console.log(response);
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
  cadastrarVaga,
  excluirVaga,
  alterarStatusVaga,
  editarVaga,
  incluirCandidatura,
};
