const { query } = require("express");
const db = require("../util/db");
const usuarios = require("./UsuariosDB");

const listarCandidatos = async function (
  nome,
  email,
  telefone,
  cpf,
  pagina = 1,
  linhasPorPagina = 20
) {
  return new Promise((resolve) => {
    let offset = (pagina - 1) * linhasPorPagina;

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

const cadastrarCandidato = async function (email, telefone, cpf, linkedin) {
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
    let query = `
    delete from candidatos_vaga where candidato_id = ?;
    delete from candidatos where id = ?;
    `;

    db.connection.query(
      query,
      [candidato_id, candidato_id],
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

const editarCandidato = async function (
  telefone,
  cpf,
  linkedin,
  candidato_id,
  nome,
  email,
  usuario_id
) {
  return new Promise((resolve) => {
    let query = `
    update candidatos set telefone = ?, cpf = ?, linkedin = ? where id = ?;
    update usuarios set nome = ?, email = ? where id = ?;
    `;
    db.connection.query(
      query,
      [telefone, cpf, linkedin, candidato_id, nome, email, usuario_id],
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
  listarCandidatos,
  cadastrarCandidato,
  excluirCandidato,
  editarCandidato,
};
