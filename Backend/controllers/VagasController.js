const vagas = require("../database/VagasDB");
const verifyJWT = require("../util/verifyJWT");

module.exports = function (app) {
  app.get(
    "/vagas",
    /* verifyJWT, */ async function (req, res) {
      res.json(await vagas.listarVagas());
    }
  );
};
