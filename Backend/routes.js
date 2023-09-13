const cadastro = require("./controllers/cadastro");
const login = require("./controllers/login");
const vagas = require("./controllers/vagas");

module.exports = function (app) {
  cadastro(app);
  login(app);
  vagas(app);
};
