const verifyJWT = require("../util/verifyJWT");
const candidatos = require("../database/CandidatosDB");
const defaultResponse = require("../util/defaultResponse");

module.exports = function (app) {
  app.get("/candidatos", async function (req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const pagina = req.body.pagina;
    const linhasPorPagina = req.body.linhasPorPagina;
    res.json(
      await candidatos.listarCandidatos(
        nome,
        email,
        telefone,
        cpf,
        pagina,
        linhasPorPagina
      )
    );
  });

  app.delete("/candidatos/excluir", async function (req, res) {
    const candidato_id = req.body.candidato_id;

    let excluirCandidato = await candidatos.excluirCandidato(candidato_id);
    if (excluirCandidato) {
      res.json(defaultResponse(true, "Candidato excluido"));
    } else {
      res.json(defaultResponse(false, "Erro ao excluir o candidato"));
    }
  });

  app.put("/candidatos/editar", async function (req, res) {
    const candidato_id = req.body.candidato_id;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const linkedin = req.body.linkedin;
    const nome = req.body.nome;
    const email = req.body.email;

    let editarCandidato = await candidatos.editarCandidato(
      telefone,
      cpf,
      linkedin,
      nome,
      email,
      candidato_id
    );
    if (editarCandidato) {
      res.json(defaultResponse(true, "Candidato alterado"));
    } else {
      res.json(defaultResponse(false, "Erro ao editar o candidato"));
    }
  });
};
