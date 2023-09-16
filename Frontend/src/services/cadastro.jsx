import { post } from "./_base";

let criar = (email, senha, nome, confirmarSenha) => {
  let body = {
    email: email,
    senha: senha,
    nome: nome,
    confirmarSenha: confirmarSenha,
  };
  return post("/cadastro/recrutador", body);
};

export { criar };
