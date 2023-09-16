const { query } = require("express");
const db = require("../util/db");
const usuarios = require("./UsuariosDB");

const listarCandidatos = async function (
  nome = "",
  email = "",
  telefone = "",
  cpf = "",
  pagina = 1,
  linhasPorPagina = 20
) {
  return new Promise((resolve) => {
    linhasPorPagina = parseInt(linhasPorPagina);
    let offset = (parseInt(pagina) - 1) * linhasPorPagina;

    let query = "select c.*, u.nome, u.email from candidatos c ";
    query += "inner join usuarios u on u.id = c.usuario_id ";
    query += "where 1=1 ";
    query += nome == "" ? "/*?*/ " : "and u.nome like ? ";
    query += email == "" ? "/*?*/ " : "and u.email like ? ";
    query += telefone == "" ? "/*?*/ " : "and c.telefone like ? ";
    query += cpf == "" ? "/*?*/ " : "and c.cpf like ? ";
    query += "limit ?  offset ?";

    db.connection.query(
      query,
      [
        "%" + nome + "%",
        "%" + email + "%",
        "%" + telefone + "%",
        "%" + cpf + "%",
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

const listarCandidatoPorId = async function (candidato_id) {
  return new Promise((resolve) => {
    db.connection.query(
      "select * from candidatos where id = ?",
      [candidato_id],
      function (err, response) {
        if (err) throw err;
        if (response.length > 0) {
          resolve({
            id: response[0].id,
            telefone: response[0].telefone,
            cpf: response[0].cpf,
            linkedin: response[0].linkedin,
            usuario_id: response[0].usuario_id,
          });
        } else {
          resolve({});
        }
      }
    );
  });
};

const cadastrarCandidato = async function (
  email,
  telefone,
  cpf,
  linkedin = ""
) {
  return new Promise(async (resolve) => {
    let usuario = await usuarios.listarUsuarioPorEmail(email);

    if (Object.keys(usuario).length > 0) {
      let usuario_id = usuario.id;
      db.connection.query(
        "insert into candidatos (telefone, cpf, linkedin, usuario_id) values (?, ?, ?, ?);",
        [telefone, cpf, linkedin, usuario_id],
        function (err, response) {
          if (err) throw err;
          if (response) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    } else {
      resolve(false);
    }
  });
};

const excluirCandidato = async function (candidato_id) {
  return new Promise((resolve) => {
    let queryCandidatosVagas =
      "delete from candidatos_vagas where candidato_id = ?; ";
    let queryCandidatos = "delete from candidatos where id = ?;";

    db.connection.query(
      queryCandidatosVagas,
      [candidato_id],
      function (err, response) {
        if (err) throw err;
        if (response) {
          db.connection.query(
            queryCandidatos,
            [candidato_id],
            function (err, response) {
              if (err) throw err;
              if (response) {
                resolve(true);
              } else {
                resolve(false);
              }
            }
          );
        } else {
          resolve(false);
        }
      }
    );
  });
};

const editarCandidato = async function (
  telefone,
  cpf,
  linkedin,
  nome,
  email,
  candidato_id
) {
  return new Promise(async (resolve) => {
    let candidato = await listarCandidatoPorId(candidato_id);

    if (Object.keys(candidato).length > 0) {
      let queryCandidatos =
        "update candidatos set telefone = ?, cpf = ?, linkedin = ? where id = ?; ";
      let queryUsuarios =
        "update usuarios set nome = ?, email = ? where id = ?;";

      db.connection.query(
        queryCandidatos,
        [telefone, cpf, linkedin, candidato_id],
        function (err, response) {
          if (err) throw err;
          if (response) {
            db.connection.query(
              queryUsuarios,
              [nome, email, candidato.usuario_id],
              function (err, response) {
                if (err) throw err;
                if (response) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }
            );
          } else {
            resolve(false);
          }
        }
      );
    } else {
      resolve(false);
    }
  });
};

module.exports = {
  listarCandidatos,
  cadastrarCandidato,
  excluirCandidato,
  editarCandidato,
};
