const vagas = require("../database/VagasDB");
const candidatosVagas = require("../database/VagasDB");
const defaultResponse = require("../util/defaultResponse");
const verifyJWT = require("../util/verifyJWT");

module.exports = function (app) {
  app.get("/minhas-vagas", async function (req, res) {
    const usuario_id = req.body.usuario_id;
    res.json(await vagas.listarVagasPorUsuario(usuario_id));
  });
  app.get("/vagas", async function (res) {
    res.json(await vagas.listarVagas());
  });
  app.get("/status-vaga", async function (res) {
    res.json(await vagas.listarStatusVaga());
  });
  app.get("/regimes-contratacao", async function (res) {
    res.json(await vagas.listarRegimesContratacao());
  });
  app.post("/incluir-candidatura", async function (req, res) {
    const candidato_id = req.body.candidato_id;
    const vaga_id = req.body.vaga_id;

    let vagaAtiva = vagas.verificarVagaItiva(vaga_id);
    if (vagaAtiva) {
      let candidaturaExistente =
        await candidatosVagas.verificarCandidaturaExistente(
          candidato_id,
          vaga_id
        );
      if (!candidaturaExistente) {
        let candidatura = await vagas.incluirCandidatura(candidato_id, vaga_id);
        res.json(
          defaultResponse(
            candidatura,
            candidatura
              ? "Candidatura concluída"
              : "Não foi possível se candidatar"
          )
        );
      } else {
        res.json(defaultResponse(false, "Você já se candidatou nesta vaga"));
      }
    } else {
      res.json(defaultResponse(false, "Esta vaga não está disponível"));
    }
  });
};
