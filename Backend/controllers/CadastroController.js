const defaultResponse = require("../util/defaultResponse");
const regEx = require("../util/regEx");
const bcrypt = require("bcrypt");
const cadastro = require("../database/CadastroDB");
const candidato = require("../database/CandidatosDB");

const erroGenerico = "Houve um erro ao cadastrar o usuário";
const tipoUsuarioRecrutador = 1;
const tipoUsuarioCandidato = 2;
const saltRounds = 10;

module.exports = function (app) {
  app.post("/cadastro/recrutador", async function (req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.confirmarSenha;

    if (senha !== confirmarSenha) {
      res.json(defaultResponse(false, "As senhas devem ser iguais"));
    } else if (senha.length < 6 || senha.length > 20) {
      res.json(
        defaultResponse(false, "A senha deve conter entre 6 e 20 caracteres")
      );
    } else if (!regEx("email", email)) {
      res.json(defaultResponse(false, "Email inválido"));
    } else {
      bcrypt.hash(senha, saltRounds, async function (err, hash) {
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
              tipoUsuarioRecrutador
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
      });
    }
  });

  app.post("/cadastro/candidato", async function (req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const linkedin = req.body.linkedin;
    const senha = Math.floor(1000 + Math.random() * 9000);

    if (!regEx("email", email)) {
      res.json(defaultResponse(false, "Email inválido"));
    } else {
      bcrypt.hash(senha, saltRounds, async function (err, hash) {
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
              tipoUsuarioCandidato
            );
            let criarCandidato = await candidato.cadastrarCandidato(
              email,
              telefone,
              cpf,
              linkedin
            );

            const success = criarCadastro && criarCandidato;
            res.json(
              defaultResponse(
                success,
                success
                  ? "Candidato " + email + " cadastrado. Senha: " + senha
                  : erroGenerico
              )
            );
          } else {
            res.json(
              defaultResponse(false, "Candidato " + email + " já cadastrado")
            );
          }
        }
      });
    }
  });
};
