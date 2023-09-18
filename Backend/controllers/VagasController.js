const vagas = require("../database/VagasDB");
const candidatosVagas = require("../database/CandidatosVagasDB");
const defaultResponse = require("../util/defaultResponse");
const verifyJWT = require("../util/verifyJWT");

const status_vaga_ativa = 1;
const status_vaga_pausada = 2;
const status_vaga_finalizada = 3;
const msg_preencha_todos_campos = "Preencha todos os campos";

module.exports = function (app) {
  app.get("/vagas/minhas-vagas/:usuario_id", async function (req, res) {
    const usuario_id = req.params.usuario_id;
    res.json(await vagas.listarVagasPorUsuario(usuario_id));
  });
  app.get("/vagas", async function (req, res) {
    const pagina = req.query.pagina;
    const linhasPorPagina = req.query.linhasPorPagina;
    const titulo = req.query.titulo;
    const empresa = req.query.empresa;
    const descricao = req.query.descricao;
    const status_vaga = req.query.status_vaga;
    const regime_contratacao = req.query.regime_contratacao;

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
  app.get("/vagas/status", async function (req, res) {
    res.json(await vagas.listarStatusVaga());
  });
  app.get("/vagas/regimes-contratacao", async function (req, res) {
    res.json(await vagas.listarRegimesContratacao());
  });
  app.post("/vagas/cadastrar", async function (req, res) {
    const titulo = req.body.titulo;
    const empresa = req.body.empresa;
    const descricao = req.body.descricao;
    const regime_contratacao_id = req.body.regime_contratacao_id;
    if (!titulo || !empresa || !descricao || !regime_contratacao_id) {
      res.json(defaultResponse(false, msg_preencha_todos_campos));
    } else {
      let cadastro = await vagas.cadastrarVaga(
        titulo,
        empresa,
        descricao,
        regime_contratacao_id
      );
      if (cadastro) {
        res.json(defaultResponse(true, "Vaga cadastrada"));
      } else {
        res.json(defaultResponse(false, "Erro ao cadastrar a vaga"));
      }
    }
  });

  app.delete("/vagas/excluir/:vaga_id", async function (req, res) {
    const vaga_id = req.params.vaga_id;

    let excluirVaga = await vagas.excluirVaga(vaga_id);
    if (excluirVaga) {
      res.json(defaultResponse(true, "Vaga excluida"));
    } else {
      res.json(defaultResponse(false, "Erro ao excluir a vaga"));
    }
  });

  app.put("/vagas/editar", async function (req, res) {
    const titulo = req.body.titulo;
    const empresa = req.body.empresa;
    const descricao = req.body.descricao;
    const regime_contratacao_id = req.body.regime_contratacao_id;
    const vaga_id = req.body.vaga_id;

    if (
      !vaga_id ||
      !titulo ||
      !empresa ||
      !descricao ||
      !regime_contratacao_id
    ) {
      res.json(defaultResponse(false, msg_preencha_todos_campos));
    }
    {
      let editarVaga = await vagas.editarVaga(
        titulo,
        empresa,
        descricao,
        regime_contratacao_id,
        vaga_id
      );
      if (editarVaga) {
        res.json(defaultResponse(true, "Vaga editada"));
      } else {
        res.json(defaultResponse(false, "Erro ao editar a vaga"));
      }
    }
  });

  app.put("/vagas/ativar", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = await vagas.alterarStatusVaga(
      vaga_id,
      status_vaga_ativa
    );
    if (alterarStatusVaga) {
      res.json(defaultResponse(true, "Vaga ativada"));
    } else {
      res.json(defaultResponse(false, "Erro ao ativar a vaga"));
    }
  });

  app.put("/vagas/pausar", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = await vagas.alterarStatusVaga(
      vaga_id,
      status_vaga_pausada
    );
    if (alterarStatusVaga) {
      res.json(defaultResponse(true, "Vaga pausada"));
    } else {
      res.json(defaultResponse(false, "Erro ao pausar a vaga"));
    }
  });

  app.put("/vagas/finalizar", async function (req, res) {
    const vaga_id = req.body.vaga_id;

    let alterarStatusVaga = await vagas.alterarStatusVaga(
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
    const usuario_id = req.body.usuario_id;
    const vaga_id = req.body.vaga_id;

    console.log(req.body);
    let vagaAtiva = await vagas.verificarVagaItiva(vaga_id);
    if (vagaAtiva) {
      let candidaturaExistente =
        await candidatosVagas.verificarCandidaturaExistente(
          usuario_id,
          vaga_id
        );
      if (!candidaturaExistente) {
        let candidatura = await vagas.incluirCandidatura(usuario_id, vaga_id);
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
