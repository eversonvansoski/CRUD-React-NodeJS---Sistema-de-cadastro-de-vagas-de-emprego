const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const defaultResponse = require("../util/defaultResponse");
const usuarios = require("../database/UsuariosDB");

const SECRET =
  "!RwxHzPuXF3_P<]J#RNs`iGB}Fx0G.j6[ZM0:?FbD54>17bvYeV|iH)M9xoUUz]";
//Deve ser utilizado uma variável de ambient. Está plaintext no código para facilitar o teste (deploy e execução local)

module.exports = function (app) {
  app.post("/login", async function (req, res) {
    const email = req.body.email;
    const senhaPlainText = req.body.senha;

    let usuario = await usuarios.listarUsuarioPorEmail(email);

    if (Object.keys(usuario).length > 0) {
      let id = usuario.id;
      let nome = usuario.nome;
      let tipoId = usuario.tipoId;
      bcrypt.compare(senhaPlainText, usuario.senha, function (err, resBc) {
        if (resBc) {
          var token = jwt.sign({ id, nome, tipoId }, SECRET, {
            expiresIn: 3600,
          });
          res.json(defaultResponse(true, token));
        } else {
          res.json(defaultResponse(false, "Senha Inválida"));
        }
      });
    } else {
      res.json(defaultResponse(false, "Usuário Inválido"));
    }
  });
};
