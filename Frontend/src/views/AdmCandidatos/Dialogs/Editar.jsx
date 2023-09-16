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
import { editar } from "../../../services/candidatos";

export default class Index extends Component {
  state = {
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    linkedin: "",
    erro: false,
    msgErro: "",
  };

  editarCandidato = () => {
    if (this.props.data) {
      this.props.data.map((item) => {
        const listItems = editar(
          this.props.id,
          this.state.nome ? this.state.nome : item.nome,
          this.state.email ? this.state.email : item.email,
          this.state.telefone ? this.state.telefone : item.telefone,
          this.state.cpf ? this.state.cpf : item.cpf,
          this.state.linkedin ? this.state.linkedin : item.linkedin
        );
        listItems
          .then((data) => {
            if (!data.data.success) {
              this.setState({ erro: true, msgErro: data.data.msg });
            } else {
              this.props.handleCloseMsg();
              this.props.listaCandidatos();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  };

  msgError = () => {
    return this.state.erro ? (
      <Grid container mt={3}>
        <Grid item xs>
          <Alert severity="error" mt={3}>
            {this.state.msgErro}
          </Alert>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
  };

  handleChangeCpf = (value) => {
    this.setState({ cpf: value });
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
  handleChangeLinkedin = (value) => {
    this.setState({ linkedin: value });
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
          {this.props &&
            this.props.data &&
            this.props.data.map((item) => (
              <>
                <DialogContentText>
                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="Nome"
                          fullWidth
                          defaultValue={item.nome}
                          onChange={(e) =>
                            this.handleChangeNome(e.target.value)
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
                          label="CPF"
                          fullWidth
                          defaultValue={item.cpf}
                          onChange={(e) => this.handleChangeCpf(e.target.value)}
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
                          label="Linkedin"
                          fullWidth
                          defaultValue={item.linkedin}
                          onChange={(e) =>
                            this.handleChangeLinkedin(e.target.value)
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
            onClick={(event, value) => this.editarCandidato()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
