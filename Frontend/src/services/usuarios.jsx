import { get, post, put, destroy, putFiles, baseUrl } from "./base";
import axios from "axios";

let getAll = () => {
  return get("/Users");
};
let getPhoto = (userId) => {
  return get("/Users/GetPhoto/" + userId);
};
let getById = (id) => {
  return get("/Users/" + id);
};
let deleteUser = (userId) => {
  return destroy("/Users/" + userId);
};
let resendPassword = (login) => {
  return get("/Users/ResendPassword/" + login);
};
let TokenValidate = (token, password, oldPassword) => {
  let body = {
    password: password,
    oldPassword: oldPassword,
  };
  return post("/Users/TokenValidate/" + token, body);
};

let create = (
  cpfCnpj,
  nome,
  email,
  cep,
  endereco,
  numero,
  cidade,
  bairro,
  estado,
  complemento,
  celular,
  telefone,
  perfilId
) => {
  let body = {
    name: nome,
    fantasyName: nome,
    userKey: cpfCnpj,
    email: email,
    cell: celular,
    telephone: telefone,
    cep: cep,
    street: endereco,
    number: numero,
    district: bairro,
    city: cidade,
    state: estado,
    complement: complemento,
    roleId: perfilId,
  };
  return post("/Users/", body);
};

let update = (
  userId,
  cpfCnpj,
  nome,
  email,
  cep,
  endereco,
  numero,
  cidade,
  bairro,
  estado,
  complemento,
  celular,
  telefone,
  perfilId,
  enabled
) => {
  let body = {
    id: userId,
    name: nome,
    fantasyName: nome,
    userKey: cpfCnpj,
    email: email,
    cell: celular,
    telephone: telefone,
    cep: cep,
    street: endereco,
    number: numero,
    district: bairro,
    city: cidade,
    state: estado,
    complement: complemento,
    isOnline: true,
    validatedEmail: true,
    roleId: perfilId,
    enabled: enabled,
  };
  return put("/Users/" + userId, body);
};

//metodo excepcional para chamada da deição do perfil
let updateProfile = (userId, email, file) => {
  return putFiles("Users/Update/" + userId, file, email, userId);
};

let changePassword = (currentPassword, newPassword) => {
  let body = {
    password: newPassword,
    oldPassword: currentPassword,
  };
  return post("/Users/ChangePassword/", body);
};

export {
  getAll,
  getById,
  getPhoto,
  deleteUser,
  create,
  update,
  updateProfile,
  resendPassword,
  TokenValidate,
  changePassword,
};
