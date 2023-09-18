import { post } from "./_base";

let criar = (nome, email, senha, confirmarSenha) => {
  let body = {
    nome: nome,
    email: email,
    senha: senha,
    confirmarSenha: confirmarSenha,
  };
  console.log(body);
  return post("/cadastro/recrutador", body);
};

export { criar };
