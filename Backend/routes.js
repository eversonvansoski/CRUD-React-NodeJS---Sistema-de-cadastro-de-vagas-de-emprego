const cadastro = require("./controllers/CadastroController");
const login = require("./controllers/LoginController");
const vagas = require("./controllers/VagasController");
const candidatos = require("./controllers/CandidatosController");

module.exports = function (app) {
  cadastro(app);
  login(app);
  vagas(app);
  candidatos(app);
};
