import { get, post, put, destroy } from "./base";

let getAll = () => {
  return get("/ClientSignature");
};
let getById = (id) => {
  return get("/ClientSignature/" + id);
};
let deleteAssinatura = (id) => {
  return destroy("/ClientSignature/" + id);
};
let sendMail = (userId) => {
  return post("/ClientSignature/SendEmail?userId=" + userId + "&message=");
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

export { getAll, getById, create, sendMail, update, deleteAssinatura };
