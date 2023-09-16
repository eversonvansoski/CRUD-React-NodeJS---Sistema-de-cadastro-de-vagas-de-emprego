import { get, post, put, destroy } from "./_base";

let listarPorFiltro = (nome, email, telefone, cpf) => {
  let query =
    "?nome=" +
    nome +
    "&email=" +
    email +
    "&telefone=" +
    telefone +
    "&cpf=" +
    cpf;

  return get("/candidatos" + query);
};

let criar = (nome, email, telefone, cpf, linkedin) => {
  let body = {
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    linkedin: linkedin,
  };
  console.log(body);

  return post("/cadastro/candidato", body);
};

let editar = (candidatoId, nome, email, telefone, cpf, linkedin) => {
  let body = {
    candidato_id: candidatoId,
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    linkedin: linkedin,
  };

  return put("/candidatos/editar", body);
};

let excluir = (candidatoId) => {
  return destroy("/candidatos/excluir/" + candidatoId);
};

export { listarPorFiltro, criar, editar, excluir };
