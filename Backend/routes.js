const usuarios = require("./controllers/UsuariosController");
const login = require("./controllers/LoginController");
const vagas = require("./controllers/VagasController");
const candidatos = require("./controllers/CandidatosController");

module.exports = function (app) {
  usuarios(app);
  login(app);
  vagas(app);
  candidatos(app);
};
