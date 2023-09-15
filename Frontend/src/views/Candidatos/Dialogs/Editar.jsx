import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";

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
    erro: false,
  };

  alterarUsuario = () => {};

  msgError = () => {
    return this.state.erro ? (
      <Grid container mt={3}>
        <Grid item xs>
          <Alert severity="error" mt={3}>
            Preencha todos os campos
          </Alert>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
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
  handleChangeTelefone = (value) => {
    this.setState({ telefone: value });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleCloseMsg}
        fullWidth
      >
        <DialogTitle>
          {this.props.title}
          {this.msgError()}
        </DialogTitle>
        <DialogContent>
          {this.props.data &&
            this.props.data.map((item) => (
              <>
                <DialogContentText>
                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="CPF/CNPJ"
                          fullWidth
                          defaultValue={item.cpfCnpj}
                          onChange={(e) =>
                            this.handleChangeCpfCnpj(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="E-mail"
                          fullWidth
                          defaultValue={item.email}
                          onChange={(e) =>
                            this.handleChangeEmail(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="Celular"
                          fullWidth
                          defaultValue={item.celular}
                          onChange={(e) =>
                            this.handleChangeCelular(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="Telefone"
                          fullWidth
                          defaultValue={item.telefone}
                          onChange={(e) =>
                            this.handleChangeTelefone(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="Cidade"
                          fullWidth
                          defaultValue={item.cidade}
                          onChange={(e) =>
                            this.handleChangeCidade(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </>
            ))}
        </DialogContent>
        <DialogActions>
          {this.props.children}
          <Button
            variant="contained"
            onClick={(event, value) => this.alterarUsuario()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
