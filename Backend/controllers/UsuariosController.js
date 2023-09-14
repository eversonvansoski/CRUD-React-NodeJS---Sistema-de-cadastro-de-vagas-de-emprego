const vagas = require("../database/usuarios");
const usuarios = require("../database/UsuariosDB");

module.exports = function (app) {
  app.get("/tipos_usuario", async function (req, res) {
    res.json(await usuarios.listarTiposUsuario());
  });
};
