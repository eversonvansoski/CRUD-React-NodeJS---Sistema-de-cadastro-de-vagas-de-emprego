const defaultResponse = require("../util/defaultResponse");
const regEx = require("../util/regEx");
const bcrypt = require("bcrypt");
const cadastro = require("../database/cadastro");

const erroGenerico = "Houve um erro ao cadastrar o usuário";

module.exports = function (app) {
  app.post("/cadastro", async function (req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.confirmarSenha;
    const tipoId = req.body.tipoId;

    if (senha !== confirmarSenha) {
      res.json(defaultResponse(false, "As senhas devem ser iguais"));
    } else if (senha.length < 6 || senha.length > 20) {
      res.json(
        defaultResponse(false, "A senha deve conter entre 6 e 20 caracteres")
      );
    } else if (!regEx("email", email)) {
      res.json(defaultResponse(false, "Email inválido"));
    } else {
      bcrypt.hash(
        senha,
        10, //saltRounds
        async function (err, hash) {
          if (err) {
            console.log(err);
            res.json(defaultResponse(false, erroGenerico));
          } else {
            const senhaHash = hash;
            let cadastroExistente = await cadastro.verificaCadastroExistente(
              email
            );
            if (!cadastroExistente) {
              let criarCadastro = await cadastro.criarCadastro(
                nome,
                email,
                senhaHash,
                tipoId
              );

              res.json(
                defaultResponse(
                  criarCadastro,
                  criarCadastro
                    ? "Usuário " + email + " cadastrado"
                    : erroGenerico
                )
              );
            } else {
              res.json(
                defaultResponse(false, "Usuário " + email + " já cadastrado")
              );
            }
          }
        }
      );
    }
  });
};
