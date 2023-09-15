const verifyJWT = require("../util/verifyJWT");
const candidatos = require("../database/CandidatosDB");

module.exports = function (app) {
  app.get("/candidatos", async function (req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    res.json(await candidatos.listarCandidatos(nome, email, telefone, cpf));
  });

  app.delete("/candidatos/excluir-candidato", async function (req, res) {
    const candidato_id = req.body.candidato_id;

    let excluirCandidato = candidatos.excluirCandidato(candidato_id);
    if (excluirCandidato) {
      res.json(defaultResponse(true, "Candidato excluido"));
    } else {
      res.json(defaultResponse(false, "Erro ao excluir o candidato"));
    }
  });

  app.put("/candidatos/editar-candidato", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let editarCandidato = candidatos.editarCandidato(
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
