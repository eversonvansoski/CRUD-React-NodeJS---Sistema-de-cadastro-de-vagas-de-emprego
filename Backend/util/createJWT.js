const jwt = require("jsonwebtoken");

const SECRET =
  "!RwxHzPuXF3_P<]J#RNs`iGB}Fx0G.j6[ZM0:?FbD54>17bvYeV|iH)M9xoUUz]";
//Deve ser utilizado uma variável de ambient. Está plaintext no código para facilitar o teste (deploy e execução local)

const createJWT = function (req) {
  const ip = req.connection.remoteAddress;

  var token = jwt.sign({ ip }, SECRET, {
    expiresIn: 3600,
  });

  return {
    auth: true,
    token: token,
  };
};

module.exports = createJWT;
