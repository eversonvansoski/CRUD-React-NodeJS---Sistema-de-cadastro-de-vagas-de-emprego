import { get, post, put, destroy } from "./_base";

let listarPorFiltro = (titulo, empresa, regimeContratacao, status) => {
  let query =
    "?titulo=" +
    titulo +
    "&empresa=" +
    empresa +
    "&status_vaga=" +
    status +
    "&regime_contratacao=" +
    regimeContratacao;

  return get("/vagas" + query);
};

let criar = (titulo, empresa, descricao, regimeContratacaoId) => {
  let body = {
    titulo: titulo,
    empresa: empresa,
    descricao: descricao,
    regime_contratacao_id: regimeContratacaoId,
  };

  return post("/vagas/cadastrar", body);
};

let editar = (vagaId, titulo, empresa, descricao, regimeContratacaoId) => {
  let body = {
    vaga_id: vagaId,
    titulo: titulo,
    empresa: empresa,
    descricao: descricao,
    regime_contratacao_id: regimeContratacaoId,
  };
  return put("/vagas/editar", body);
};

let ativar = (vagaId) => {
  let body = {
    vaga_id: vagaId,
  };
  return put("/vagas/ativar", body);
};
let pausar = (vagaId) => {
  let body = {
    vaga_id: vagaId,
  };
  return put("/vagas/pausar", body);
};
let finalizar = (vagaId) => {
  let body = {
    vaga_id: vagaId,
  };
  return put("/vagas/finalizar", body);
};
let excluir = (vagaId) => {
  return destroy("/vagas/excluir/" + vagaId);
};

export { listarPorFiltro, criar, editar, ativar, pausar, finalizar, excluir };
