/* import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  FormGroup,
  LinearProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { create } from "../../services/usuarios";
import { create as createAssinatura } from "../../services/assinaturas";
import { refreshToken } from "../../utils/utils";

export default class Index extends Component {
  state = {
    cpfCnpj: "",
    nome: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    bairro: "",
    estado: "",
    complemento: "",
    celular: "",
    telefone: "",
    perfilId: 0,
    criarAssinatura: false,
    dataAssinatura: "",
    dataVencimento: "",
    erro: false,
    loading: false,
    msg: "",
  };

  inserirUsuario = () => {
    this.setState({ loading: true });
    if (
      this.state.cpfCnpj === "" ||
      this.state.nome === "" ||
      this.state.email === "" ||
      this.state.cep === "" ||
      this.state.endereco === "" ||
      this.state.numero === "" ||
      this.state.cidade === "" ||
      this.state.bairro === "" ||
      this.state.estado === "" ||
      this.state.complemento === "" ||
      this.state.celular === "" ||
      this.state.telefone === "" ||
      this.state.perfilId === 0
    ) {
      this.setState({ erro: true });
      this.setState({ loading: false });
    } else {
      const post = create(
        this.state.cpfCnpj,
        this.state.nome,
        this.state.email,
        this.state.cep,
        this.state.endereco,
        this.state.numero,
        this.state.cidade,
        this.state.bairro,
        this.state.estado,
        this.state.complemento,
        this.state.celular,
        this.state.telefone,
        this.state.perfilId
      );
      post
        .then((data) => {
          if (
            this.state.criarAssinatura &&
            this.state.dataAssinatura !== "" &&
            this.state.dataVencimento !== ""
          ) {
            const post = createAssinatura(
              data.data.id,
              this.state.dataAssinatura,
              this.state.dataVencimento
            );
            post
              .then((data) => {
                this.setState({ erro: false, msg: "", loading: false });
              })
              .catch((e) => {
                this.setState({
                  erro: true,
                  msg: e.response.data.message,
                  loading: false,
                });
              });
          }
          this.props.handleCloseMsg();
          this.props.listUsuarios();
        })
        .catch((e) => {
          this.setState({
            erro: true,
            msg: e.response.data.message,
            loading: false,
          });
          e.response.status === 401 && refreshToken();
        });
    }
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

  handleChangeCpfCnpj = (value) => {
    this.setState({ cpfCnpj: value });
  };
  handleChangeNome = (value) => {
    this.setState({ nome: value });
  };
  handleChangeEmail = (value) => {
    this.setState({ email: value });
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
  };
  handleChangeEstado = (value) => {
    this.setState({ estado: value });
  };
  handleChangeComplemento = (value) => {
    this.setState({ complemento: value });
  };
  handleChangeCelular = (value) => {
    this.setState({ celular: value });
  };
  handleChangeTelefone = (value) => {
    this.setState({ telefone: value });
  };
  handleChangePerfil = (value) => {
    if (value !== undefined) this.setState({ perfilId: value });
  };
  handleChangeCriarAssinatura = (value) => {
    if (value !== undefined)
      this.setState({
        criarAssinatura: this.state.criarAssinatura === false ? true : false,
      });
  };
  handleChangePlano = (value) => {
    let dt = new Date();
    let dtVenc = new Date();
    dtVenc.setDate(dtVenc.getDate() + value);

    let anoAssinatura = dt.getFullYear();
    let mesAssinatura = dt.getMonth() + 1;
    mesAssinatura = mesAssinatura > 9 ? mesAssinatura : "0" + mesAssinatura;
    let diaAssinatura = dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate();
    let anoVencimento = dtVenc.getFullYear();
    let mesVencimento = dtVenc.getMonth() + 1;
    mesVencimento = mesVencimento > 9 ? mesVencimento : "0" + mesVencimento;
    let diaVencimento =
      dtVenc.getDate() > 9 ? dtVenc.getDate() : "0" + dtVenc.getDate();

    this.setState({
      dataAssinatura: anoAssinatura + "-" + mesAssinatura + "-" + diaAssinatura,
      dataVencimento: anoVencimento + "-" + mesVencimento + "-" + diaVencimento,
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleCloseMsg}
        fullWidth
      >
        {this.state.loading && <LinearProgress />}
        {this.state.erro && (
          <Alert severity="error" mt={3}>
            {this.state.msg}
          </Alert>
        )}

        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Box>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio
                          sx={{
                            color:
                              this.state.perfilId === 0 && this.state.erro
                                ? "#d32f2f"
                                : "",
                          }}
                        />
                      }
                      label="Administrador"
                      onClick={(e) => this.handleChangePerfil(e.target.value)}
                    />
                    <FormControlLabel
                      value="2"
                      control={
                        <Radio
                          sx={{
                            color:
                              this.state.perfilId === 0 && this.state.erro
                                ? "#d32f2f"
                                : "",
                          }}
                        />
                      }
                      label="Comercial"
                      onClick={(e) => this.handleChangePerfil(e.target.value)}
                    />
                    <FormControlLabel
                      value="3"
                      control={
                        <Radio
                          sx={{
                            color:
                              this.state.perfilId === 0 && this.state.erro
                                ? "#d32f2f"
                                : "",
                          }}
                        />
                      }
                      label="Produtor"
                      onClick={(e) => this.handleChangePerfil(e.target.value)}
                    />
                    <FormControlLabel
                      value="4"
                      control={
                        <Radio
                          sx={{
                            color:
                              this.state.perfilId === 0 && this.state.erro
                                ? "#d32f2f"
                                : "",
                          }}
                        />
                      }
                      label="Cliente"
                      onClick={(e) => this.handleChangePerfil(e.target.value)}
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            {this.state.perfilId == 4 ? (
              <Grid container spacing={3} mt={1}>
                <Grid item xs={6} md={6} lg={6}>
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        value={this.state.criarAssinatura}
                        control={<Switch />}
                        label="Criar assinatura"
                        onClick={(e) =>
                          this.handleChangeCriarAssinatura(e.target.value)
                        }
                      />
                    </FormGroup>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="plano">Plano / Vencimento *</InputLabel>
                      <Select
                        disabled={!this.state.criarAssinatura}
                        required
                        labelId="plano"
                        label="Plano / Vencimento"
                        value={this.state.planoAssinatura}
                        fullWidth
                        onChange={(e) => this.handleChangePlano(e.target.value)}
                      >
                        <MenuItem value={3}>Teste 3 Dias</MenuItem>
                        <MenuItem value={366}>Um Ano</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            <Grid container spacing={3} mt={1}>
              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    label="CPF/CNPJ"
                    fullWidth
                    error={this.state.cpfCnpj === "" && this.state.erro}
                    value={this.state.cpfCnpj}
                    onChange={(e) => this.handleChangeCpfCnpj(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    label="E-mail"
                    fullWidth
                    error={this.state.email === "" && this.state.erro}
                    value={this.state.email}
                    onChange={(e) => this.handleChangeEmail(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Box>
                  <TextField
                    required
                    label="Nome / Razão Social"
                    fullWidth
                    error={this.state.nome === "" && this.state.erro}
                    value={this.state.nome}
                    onChange={(e) => this.handleChangeNome(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    label="Celular"
                    fullWidth
                    error={this.state.celular === "" && this.state.erro}
                    value={this.state.celular}
                    onChange={(e) => this.handleChangeCelular(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    label="Telefone"
                    fullWidth
                    error={this.state.telefone === "" && this.state.erro}
                    value={this.state.telefone}
                    onChange={(e) => this.handleChangeTelefone(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={3} md={3} lg={3}>
                <Box>
                  <TextField
                    required
                    label="CEP"
                    fullWidth
                    error={this.state.cep === "" && this.state.erro}
                    value={this.state.cep}
                    onChange={(e) => this.handleChangeCep(e.target.value)}
                    onKeyUp={(e) => this.handleCep(e.target.value)}
                    inputProps={{
                      maxLength: 8,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Box>
                  <TextField
                    required
                    label="Endereço"
                    fullWidth
                    error={this.state.endereco === "" && this.state.erro}
                    value={this.state.endereco}
                    onChange={(e) => this.handleChangeEndereco(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={3} md={3} lg={3}>
                <Box>
                  <TextField
                    required
                    label="Número"
                    fullWidth
                    error={this.state.numero === "" && this.state.erro}
                    value={this.state.numero}
                    onChange={(e) => this.handleChangeNumero(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={5} md={5} lg={5}>
                <Box>
                  <TextField
                    required
                    label="Bairro"
                    fullWidth
                    error={this.state.bairro === "" && this.state.erro}
                    value={this.state.bairro}
                    onChange={(e) => this.handleChangeBairro(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Box>
                  <TextField
                    required
                    label="Complemento"
                    fullWidth
                    error={this.state.complemento === "" && this.state.erro}
                    value={this.state.complemento}
                    onChange={(e) =>
                      this.handleChangeComplemento(e.target.value)
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    label="Cidade"
                    fullWidth
                    error={this.state.cidade === "" && this.state.erro}
                    value={this.state.cidade}
                    onChange={(e) => this.handleChangeCidade(e.target.value)}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="estado">Estado *</InputLabel>
                    <Select
                      required
                      labelId="estado"
                      label="Estado"
                      error={this.state.estado === "" && this.state.erro}
                      value={this.state.estado}
                      fullWidth
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {this.props.children}
          <Button
            variant="contained"
            onClick={(event, value) => this.inserirUsuario()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
 */
