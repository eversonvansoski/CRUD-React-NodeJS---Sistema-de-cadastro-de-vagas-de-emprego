import { post } from "./_base";

let auth = (email, senha) => {
  let body = {
    email: email,
    senha: senha,
  };
  return post("/login", body);
};

export { auth };
