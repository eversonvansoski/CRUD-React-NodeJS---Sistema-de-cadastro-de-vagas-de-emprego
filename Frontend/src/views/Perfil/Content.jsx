import React, { Component } from "react";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Avatar,
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  getById as getUserById,
  updateProfile,
  changePassword,
} from "../../services/usuarios";
import { getDataToken, refreshToken, regexTest } from "../../utils/utils";
import Resizer from "react-image-file-resizer";

export default class Content extends Component {
  state = {
    cpfCnpj: "",
    nome: "",
    email: "",
    novoEmail: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    novaFoto: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    bairro: "",
    estado: "",
    foto: "",
    erroEmail: false,
    erroImg: false,
    erroSenha: false,
    msgEmail: "",
    msgImg: "",
    msgSenha: "",
    senhaContemSeisDg: false,
    senhaContemNumero: false,
    senhaContemLetraMa: false,
    senhaContemLetraMi: false,
    senhaContemCaracEsp: false,
    botaoSalvarHabilitado: false,
  };

  componentDidMount = () => {
    this.setState({
      foto:
        localStorage.getItem("userPhoto") === undefined
          ? ""
          : localStorage.getItem("userPhoto"),
    });
    this.listarUsuario();
  };

  /* handleChangeCpfCnpj = (value) => {
    this.setState({ cpfCnpj: value });
  };
  handleChangeNome = (value) => {
    this.setState({ nome: value });
  };
  handleChangeCep = (value) => {
    this.setState({ cep: value });
  };
  handleChangeEndereco = (value) => {
    this.setState({ endereco: value });
  };
  handleChangeNumero = (value) => {
    this.setState({ numero: value });
  };
  handleChangeCidade = (value) => {
    this.setState({ cidade: value });
  };
  handleChangeBairro = (value) => {
    this.setState({ bairro: value });
  }; */
  handleChangeEmail = (value) => {
    this.setState({ email: value });
  };
  handleChangeNovoEmail = (value) => {
    this.setState({ novoEmail: value });
  };
  handleChangeSenhaAtual = (value) => {
    this.setState({ senhaAtual: value });
  };
  handleChangeNovaSenha = (value) => {
    this.setState({
      novaSenha: value,
      senhaContemSeisDg: value.length >= 6,
      senhaContemNumero: regexTest("numero", value),
      senhaContemLetraMa: regexTest("letra_maiuscula", value),
      senhaContemLetraMi: regexTest("letra_minuscula", value),
      senhaContemCaracEsp: regexTest("caractere_especial", value),
    });
  };
  handleChangeConfirmarSenha = (value) => {
    this.setState({ confirmarSenha: value });
  };

  listarUsuario = () => {
    const service = getUserById(getDataToken().nameidentifier);
    service
      .then((data) => {
        this.setState({
          cpfCnpj: data.data.userKey,
          nome: data.data.name,
          email: data.data.email,
          cep: data.data.cep,
          endereco: data.data.street,
          numero: data.data.number,
          cidade: data.data.city,
          bairro: data.data.district,
          estado: data.data.state,
        });
      })
      .catch((e) => {
        e.response.status === 401 && refreshToken();
      });
  };

  handleCep = (cep) => {
    if (cep.length === 8) {
      axios
        .request({
          method: "get",
          url: "https://viacep.com.br/ws/" + cep + "/json/",
        })
        .then((response) => response.data)
        .then((data) => {
          this.setState({
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          });
        });
    }
  };

  resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "JPEG",
        95,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  handleChangeFile = async (event) => {
    try {
      let extensao = event.target.files[0].name.split(".").pop().toLowerCase();

      if (extensao === "png" || extensao === "jpg" || extensao === "jpeg") {
        const file = event.target.files[0];
        const image = await this.resizeFile(file);

        this.setState({
          novaFoto: image.split(",")[1],
          erroImg: false,
        });
        this.setState({
          botaoSalvarHabilitado: true,
        });
      } else {
        this.setState({
          erroImg: true,
          msgImg: "Selecione um arquivo .png ou .jpg",
        });
      }
    } catch (err) {}
  };

  handleDeleteFile = (event) => {
    this.setState({
      novaFoto: "",
      foto: "",
      botaoSalvarHabilitado: true,
    });
    localStorage.setItem("userPhoto", "");
  };

  handleUpdatePhoto = () => {
    this.setState({
      botaoSalvarHabilitado: false,
    });
    localStorage.setItem("userPhoto", this.state.novaFoto);
    let file =
      this.state.novaFoto === "" ? this.state.foto : this.state.novaFoto;
    let email =
      this.state.novoEmail === "" ? this.state.email : this.state.novoEmail;
    const service = this.handleAlterarFoto(
      getDataToken().nameidentifier,
      email,
      file
    );
    service
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleClickUpdateEmail = () => {
    let file =
      this.state.novaFoto === "" ? this.state.foto : this.state.novaFoto;
    let email = this.state.novoEmail;
    if (email === "") {
      this.setState({ erroEmail: true, msgEmail: "Digite o novo e-mail" });
    } else {
      this.setState({ erroEmail: false, msgEmail: "" });
      this.handleAlterarEmail(getDataToken().nameidentifier, email, file);
    }
  };
  handleClickUpdatePassword = () => {
    if (
      this.state.senhaAtual !== "" ||
      this.state.novaSenha !== "" ||
      this.state.confirmarSenha !== ""
    ) {
      if (this.state.novaSenha !== this.state.confirmarSenha) {
        this.setState({
          msgSenha: "As senhas devem ser iguais",
          erroSenha: true,
        });
      } else {
        this.handleAlterarSenhaUsuario(
          this.state.senhaAtual,
          this.state.novaSenha
        );
      }
    }
  };
  handleAlterarFoto = (userId, email, file) => {
    const service = updateProfile(userId, email, file);
    service
      .then((data) => {
        this.setState({
          msgFoto: "Foto alterada!",
          erroFoto: false,
        });
      })
      .catch((e) => {
        this.setState({
          msgFoto: e.response.data.message,
          erroFoto: true,
        });
        e.response.status === 401 && refreshToken();
      });
  };
  handleAlterarEmail = (userId, email, file) => {
    const service = updateProfile(userId, email, file);
    service
      .then((data) => {
        this.setState({
          msgEmail: "Email alterado!",
          erroEmail: false,
        });
      })
      .catch((e) => {
        this.setState({
          msgEmail: e.response.data.message,
          erroEmail: true,
        });
        e.response.status === 401 && refreshToken();
      });
  };
  handleAlterarSenhaUsuario = (senhaAtual, novaSenha) => {
    const service = changePassword(senhaAtual, novaSenha);
    service
      .then((data) => {
        this.setState({
          msgSenha: "Senha foi alterada",
          erroSenha: false,
        });
      })
      .catch((e) => {
        let erros = "";
        let erroSenhaAtual = e.response.data.message;
        if (erroSenhaAtual === undefined) {
          let errosPassword = e.response.data.errors.Password;
          let errosOldPassword = e.response.data.errors.OldPassword;
          errosPassword &&
            errosPassword.map((item) => {
              erros += item.includes("The") ? "" : item;
            });
          errosOldPassword &&
            errosOldPassword.map((item) => {
              erros += item.includes("The") ? "" : item;
            });
        } else {
          erros = erroSenhaAtual;
        }
        this.setState({
          msgSenha: erros,
          erroSenha: true,
        });
        e.response.status === 401 && refreshToken();
      });
  };

  render() {
    return (
      <>
        <Stack>
          <Grid container spacing={3}>
            <Grid item xs={0} md={5} lg={5}></Grid>
            <Grid item xs={12} md={2} lg={2}>
              <Box
                ml={1}
                mr={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  src={
                    "data:image/png;base64," +
                    (this.state.novaFoto === ""
                      ? localStorage.getItem("userPhoto") !== undefined &&
                        localStorage.getItem("userPhoto") !== ""
                        ? localStorage.getItem("userPhoto")
                        : this.state.foto
                      : this.state.novaFoto)
                  }
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    variant="outlined"
                    component="label"
                    endIcon={<PhotoCameraIcon />}
                  >
                    Trocar Foto
                    <input
                      id="file"
                      type="file"
                      hidden
                      onChange={this.handleChangeFile}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    component="label"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={this.handleDeleteFile}
                  >
                    Excluir Foto
                  </Button>
                </ButtonGroup>
              </Box>
              <br />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  endIcon={<SaveIcon />}
                  onClick={this.handleUpdatePhoto}
                  disabled={!this.state.botaoSalvarHabilitado}
                >
                  Salvar
                </Button>
              </Box>
            </Grid>
            {/*             <Grid item xs={12} md={4} lg={4}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                }}
              >
                <Button variant="contained" fullWidth>
                  Visualizar Contrato
                </Button>
              </Box>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mt: 3,
                }}
              >
                <Button variant="contained" fullWidth>
                  Visualizar Financeiro
                </Button>
              </Box>
            </Grid> */}
          </Grid>
          {this.state.msgImg !== "" && (
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    ml: 3,
                    mr: 3,
                  }}
                >
                  <Alert
                    severity={this.state.erroImg ? "error" : "success"}
                    mt={3}
                  >
                    {this.state.msgImg}
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  label="CPF/CNPJ"
                  disabled
                  fullWidth
                  value={this.state.cpfCnpj}
                  onChange={(e) => this.handleChangeCpfCnpj(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  label="Nome / Razão Social"
                  fullWidth
                  disabled
                  value={this.state.nome}
                  onChange={(e) => this.handleChangeNome(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  label="CEP"
                  fullWidth
                  disabled
                  value={this.state.cep}
                  onChange={(e) => this.handleChangeCep(e.target.value)}
                  onKeyUp={(e) => this.handleCep(e.target.value)}
                  inputProps={{
                    maxLength: 8,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  label="Endereço"
                  fullWidth
                  disabled
                  value={this.state.endereco}
                  onChange={(e) => this.handleChangeEndereco(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  label="Bairro"
                  fullWidth
                  disabled
                  value={this.state.bairro}
                  onChange={(e) => this.handleChangeBairro(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  label="Cidade"
                  fullWidth
                  disabled
                  value={this.state.cidade}
                  onChange={(e) => this.handleChangeCidade(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  label="Número"
                  fullWidth
                  disabled
                  value={this.state.numero}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <FormControl fullWidth disabled>
                  <InputLabel id="estado">Estado</InputLabel>
                  <Select
                    labelId="estado"
                    label="Estado"
                    value={this.state.estado}
                    fullWidth
                    disabled
                    onChange={(e) => this.handleChangeEstado(e.target.value)}
                  >
                    <MenuItem value={"AC"}>Acre</MenuItem>
                    <MenuItem value={"AL"}>Alagoas</MenuItem>
                    <MenuItem value={"AP"}>Amapá</MenuItem>
                    <MenuItem value={"AM"}>Amazonas</MenuItem>
                    <MenuItem value={"BA"}>Bahia</MenuItem>
                    <MenuItem value={"CE"}>Ceará</MenuItem>
                    <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                    <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                    <MenuItem value={"GO"}>Goiás</MenuItem>
                    <MenuItem value={"MA"}>Maranhão</MenuItem>
                    <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                    <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                    <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                    <MenuItem value={"PA"}>Pará</MenuItem>
                    <MenuItem value={"PB"}>Paraíba</MenuItem>
                    <MenuItem value={"PR"}>Paraná</MenuItem>
                    <MenuItem value={"PE"}>Pernambuco</MenuItem>
                    <MenuItem value={"PI"}>Piauí</MenuItem>
                    <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                    <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                    <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                    <MenuItem value={"RO"}>Rondônia</MenuItem>
                    <MenuItem value={"RR"}>Roraima</MenuItem>
                    <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                    <MenuItem value={"SP"}>São Paulo</MenuItem>
                    <MenuItem value={"SE"}>Sergipe</MenuItem>
                    <MenuItem value={"TO"}>Tocantins</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  ml: 3,
                  mr: 3,
                }}
              >
                <Divider>
                  <Chip label="Alterar Email" />
                </Divider>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  autoComplete="off"
                  label="E-mail"
                  fullWidth
                  value={this.state.email}
                  onChange={(e) => this.handleChangeEmail(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Alterar E-mail"
                  value={this.state.novoEmail}
                  onChange={(e) => this.handleChangeNovoEmail(e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>

          {this.state.msgEmail !== "" && (
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    ml: 3,
                    mr: 3,
                  }}
                >
                  <Alert severity={"error"} mt={3}>
                    {this.state.msgEmail}
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={12} lg={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <Button
                variant="contained"
                sx={{ width: 200 }}
                onClick={() => this.handleClickUpdateEmail()}
              >
                Salvar Email
              </Button>
            </Box>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  ml: 3,
                  mr: 3,
                }}
              >
                <Divider>
                  <Chip label="Alterar Senha" />
                </Divider>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Box
                sx={{
                  ml: { xs: 0, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Senha Atual"
                  fullWidth
                  type="password"
                  value={this.state.senhaAtual}
                  onChange={(e) => this.handleChangeSenhaAtual(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Nova Senha"
                  fullWidth
                  type="password"
                  value={this.state.novaSenha}
                  onChange={(e) => this.handleChangeNovaSenha(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Box
                sx={{
                  ml: { xs: 0, md: 1.5 },
                  mr: { xs: 0, md: 3 },
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Confirmar Senha"
                  fullWidth
                  type="password"
                  value={this.state.confirmarSenha}
                  onChange={(e) =>
                    this.handleChangeConfirmarSenha(e.target.value)
                  }
                />
              </Box>
            </Grid>
          </Grid>
          {this.state.msgSenha !== "" && (
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    ml: 3,
                    mr: 3,
                  }}
                >
                  <Alert
                    severity={this.state.erroSenha ? "error" : "success"}
                    mt={3}
                  >
                    {this.state.msgSenha}
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  ml: 3,
                  mr: 3,
                }}
              >
                <Alert severity="info" mt={3}>
                  A senha deve conter as características abaixo:
                  <br />
                  <Typography
                    variant="body2"
                    color={this.state.senhaContemSeisDg ? "green" : "#d38800"}
                  >
                    Pelo menos seis dígitos
                  </Typography>
                  <Typography
                    variant="body2"
                    color={this.state.senhaContemLetraMa ? "green" : "#d38800"}
                  >
                    Letra maiúscula
                  </Typography>
                  <Typography
                    variant="body2"
                    color={this.state.senhaContemLetraMi ? "green" : "#d38800"}
                  >
                    Letra minúscula
                  </Typography>
                  <Typography
                    variant="body2"
                    color={this.state.senhaContemNumero ? "green" : "#d38800"}
                  >
                    Número
                  </Typography>
                  <Typography
                    variant="body2"
                    color={this.state.senhaContemCaracEsp ? "green" : "#d38800"}
                  >
                    Caractere especial (@, $, %, #, *, etc.)
                  </Typography>
                </Alert>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <Button
                variant="contained"
                sx={{ width: 200 }}
                onClick={() => this.handleClickUpdatePassword()}
              >
                Salvar Senha
              </Button>
            </Box>
          </Grid>
        </Stack>
      </>
    );
  }
}
