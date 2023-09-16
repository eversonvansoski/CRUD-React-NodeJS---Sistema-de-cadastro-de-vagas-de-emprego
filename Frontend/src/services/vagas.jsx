import { get, post, put, destroy } from "./_base";

let getByFilter = (titulo, empresa, regimeContratacao, status) => {
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

let create = (vagaId, titulo, empresa, regimeContratacaoId, descricao) => {
  let body = {
    vaga_id: vagaId,
    titulo: titulo,
    empresa: empresa,
    descricao: descricao,
    regime_contratacao_id: regimeContratacaoId,
    status_vaga_id: 1,
  };
  return post("/vagas/cadastrar", body);
};

let update = (vagaId, titulo, empresa, regimeContratacaoId, descricao) => {
  let body = {
    vaga_id: vagaId,
    titulo: titulo,
    empresa: empresa,
    descricao: descricao,
    regime_contratacao_id: regimeContratacaoId,
  };
  return put("/vagas/editar", body);
};

export { getByFilter, create, update };
