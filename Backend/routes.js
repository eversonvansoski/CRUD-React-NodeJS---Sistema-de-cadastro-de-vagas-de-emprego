const cadastro = require("./controllers/CadastroController");
const login = require("./controllers/LoginController");
const vagas = require("./controllers/VagasController");

module.exports = function (app) {
  cadastro(app);
  login(app);
  vagas(app);
};
