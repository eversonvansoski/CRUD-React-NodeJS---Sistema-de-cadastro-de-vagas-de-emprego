const verifyJWT = require("../util/verifyJWT");
const candidatos = require("../database/CandidatosDB");

module.exports = function (app) {
  app.get(
    "/candidatos",
    /* verifyJWT, */ async function (req, res) {
      res.json(await candidatos.listarCandidatos());
    }
  );
};
