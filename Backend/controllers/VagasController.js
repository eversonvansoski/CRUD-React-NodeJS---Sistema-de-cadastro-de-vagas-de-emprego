const vagas = require("../database/VagasDB");
const candidatosVagas = require("../database/VagasDB");
const defaultResponse = require("../util/defaultResponse");
const verifyJWT = require("../util/verifyJWT");

const status_vaga_ativa = 1;
const status_vaga_pausada = 1;
const status_vaga_finalizada = 1;

module.exports = function (app) {
  app.get("/vagas/minhas-vagas", async function (req, res) {
    const usuario_id = req.body.usuario_id;
    res.json(await vagas.listarVagasPorUsuario(usuario_id));
  });
  app.get("/vagas", async function (req, res) {
    const pagina = req.body.pagina;
    const linhasPorPagina = req.body.linhasPorPagina;
    const titulo = req.body.titulo;
    const empresa = req.body.empresa;
    const descricao = req.body.descricao;
    const status_vaga = req.body.status_vaga;
    const regime_contratacao = req.body.regime_contratacao;

    res.json(
      await vagas.listarVagas(
        titulo,
        empresa,
        descricao,
        status_vaga,
        regime_contratacao,
        pagina,
        linhasPorPagina
      )
    );
  });
  app.get("/vagas/status-vaga", async function (req, res) {
    res.json(await vagas.listarStatusVaga());
  });
  app.get("/vagas/regimes-contratacao", async function (req, res) {
    res.json(await vagas.listarRegimesContratacao());
  });
  app.post("/vagas/cadastrar-vaga", async function (req, res) {
    const titulo = req.body.titulo;
    const empresa = req.body.empresa;
    const descricao = req.body.descricao;
    const status_vaga_id = req.body.status_vaga_id;
    const regime_contratacao_id = req.body.regime_contratacao_id;

    let cadastro = vagas.cadastrarVaga(
      titulo,
      empresa,
      descricao,
      status_vaga_id,
      regime_contratacao_id
    );
    if (cadastro) {
      res.json(defaultResponse(true, "Vaga cadastrada"));
    } else {
      res.json(defaultResponse(false, "Erro ao cadastrar a vaga"));
    }
  });

  app.delete("/vagas/excluir-vaga", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let excluirVaga = vagas.excluirVaga(vaga_id);
    if (excluirVaga) {
      res.json(defaultResponse(true, "Vaga excluida"));
    } else {
      res.json(defaultResponse(false, "Erro ao excluir a vaga"));
    }
  });

  app.put("/vagas/editar-vaga", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let editarVaga = vagas.editarVaga(
      titulo,
      empresa,
      descricao,
      regime_contratacao_id
    );
    if (editarVaga) {
      res.json(defaultResponse(true, "Vaga editada"));
    } else {
      res.json(defaultResponse(false, "Erro ao editar a vaga"));
    }
  });

  app.put("/vagas/ativar-vaga", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = vagas.alterarStatusVaga(vaga_id, status_vaga_ativa);
    if (alterarStatusVaga) {
      res.json(defaultResponse(true, "Vaga ativada"));
    } else {
      res.json(defaultResponse(false, "Erro ao ativar a vaga"));
    }
  });

  app.put("/vagas/pausar-vaga", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = vagas.alterarStatusVaga(
      vaga_id,
      status_vaga_pausada
    );
    if (alterarStatusVaga) {
      res.json(defaultResponse(true, "Vaga pausada"));
    } else {
      res.json(defaultResponse(false, "Erro ao pausar a vaga"));
    }
  });

  app.put("/vagas/finalizar-vaga", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = vagas.alterarStatusVaga(
      vaga_id,
      status_vaga_finalizada
    );
    if (alterarStatusVaga) {
      res.json(defaultResponse(true, "Vaga finalizada"));
    } else {
      res.json(defaultResponse(false, "Erro ao finalizar a vaga"));
    }
  });

  app.post("/vagas/incluir-candidatura", async function (req, res) {
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
