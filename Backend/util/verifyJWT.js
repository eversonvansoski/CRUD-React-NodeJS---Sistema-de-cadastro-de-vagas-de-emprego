const jwt = require("jsonwebtoken");
const createJWT = require("./createJWT");
const defaultResponse = require("./defaultResponse");
const SECRET =
  "!RwxHzPuXF3_P<]J#RNs`iGB}Fx0G.j6[ZM0:?FbD54>17bvYeV|iH)M9xoUUz]";
//Deve ser utilizado uma variável de ambient. Está plaintext no código para facilitar o teste (deploy e execução local)

const verifyJWT = function (req, res, next) {
  var resPage = res;
  var token = req.headers["x-access-token"];

  if (!token) {
    if (typeof resPage !== "undefined") {
      return res.status(401).send(defaultResponse(false, "Token não aprovado"));
    } else {
      return defaultResponse(false, "Token não aprovado");
    }
  }

  let retornoVerify = defaultResponse(false, "Token não aprovado");
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      if (typeof resPage !== "undefined") {
        return res
          .status(200)
          .send(defaultResponse(false, "Autenticação Inválida."));
      } else {
        retornoVerify = defaultResponse(false, "Autenticação Inválida.");
      }
      //return res.status(200).send(defaultResponse(jwt.auth, jwt.token));
    } else {
      if (typeof resPage !== "undefined") {
        //return res.status(200).send(defaultResponse(true, decoded.id));
      } else {
        retornoVerify = defaultResponse(true, decoded.id);
      }
    }

    if (typeof resPage !== "undefined") {
      next();
    } else {
      next(retornoVerify);
    }
  });
};

module.exports = verifyJWT;
