import { get, post, put, destroy } from "./_base";

let getByFilter = (nome, email, telefone, cpf) => {
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

let create = (userId, signatureDate, signatureExpirationDate) => {
  let body = {
    id: 0,
    signatureDate: signatureDate,
    signatureExpirationDate: signatureExpirationDate,
    isActive: true,
    dateCreated: signatureDate,
    userId: userId,
  };
  return post("/ClientSignature/Create", body);
};

let update = (userId, signatureId, isActive) => {
  let body = {
    id: signatureId,
    isActive: isActive,
    userId: userId,
  };
  return put("/ClientSignature/" + userId, body);
};

export { getByFilter, create, update };
