const vagas = require("../database/vagas");
const verifyJWT = require("../util/verifyJWT");

module.exports = function (app) {
  app.get(
    "/vagas",
    /* verifyJWT, */ async function (req, res) {
      res.json(await vagas.listarVagas());
    }
  );
};
