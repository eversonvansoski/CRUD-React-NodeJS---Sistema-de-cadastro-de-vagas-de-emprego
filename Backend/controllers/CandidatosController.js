const verifyJWT = require("../util/verifyJWT");
const candidatos = require("../database/CandidatosDB");

module.exports = function (app) {
  app.get(
    "/candidatos",
    /* verifyJWT, */ async function (req, res) {
      res.json(await candidatos.listarCandidatos());
    }
  );

  app.delete("/candidatos/excluir-candidato", async function (req, res) {
    const candidato_id = req.body.candidato_id;

    let excluirCandidato = vagas.excluirCandidato(candidato_id);
    if (excluirCandidato) {
      res.json(defaultResponse(true, "Candidato excluido"));
    } else {
      res.json(defaultResponse(false, "Erro ao excluir o candidato"));
    }
  });

  app.put("/candidatos/editar-candidato", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let editarCandidato = vagas.editarCandidato(
      titulo,
      empresa,
      descricao,
      regime_contratacao_id
    );
    if (editarCandidato) {
      res.json(defaultResponse(true, "Candidato alterado"));
    } else {
      res.json(defaultResponse(false, "Erro ao editar o candidato"));
    }
  });
};
