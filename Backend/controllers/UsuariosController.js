const vagas = require("../database/usuarios");
const verifyJWT = require("../util/verifyJWT");
const usuarios = require("../database/UsuariosDB");

module.exports = function (app) {
  app.get(
    "/usuarios",
    /* verifyJWT, */ async function (req, res) {
      res.json(await usuarios.listarUsuarios());
    }
  );
};
