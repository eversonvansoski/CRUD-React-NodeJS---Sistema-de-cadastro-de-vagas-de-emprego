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
import { criar } from "../../../services/candidatos";

export default class Index extends Component {
  state = {
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    linkedin: "",
    erro: false,
    success: false,
    msg: "",
  };

  cadastrarCandidato = () => {
    const listItems = criar(
      this.state.nome,
      this.state.email,
      this.state.telefone,
      this.state.cpf,
      this.state.linkedin
    );
    listItems
      .then((data) => {
        this.setState({ msg: data.data.msg });
        if (!data.data.success) {
          this.setState({ erro: true });
        } else {
          this.setState({ success: true });
          this.props.listaCandidatos();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  msgError = () => {
    return this.state.erro ? (
      <Grid container mt={3}>
        <Grid item xs>
          <Alert severity="error" mt={3}>
            {this.state.msg}
          </Alert>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
  };
  msgSuccess = () => {
    return this.state.success ? (
      <Grid container mt={3}>
        <Grid item xs>
          <Alert severity="success" mt={3}>
            {this.state.msg}
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
          {this.msgSuccess()}
        </DialogTitle>
        <DialogContent>
          <>
            <DialogContentText>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={6} md={6} lg={6}>
                  <Box>
                    <TextField
                      label="Nome"
                      fullWidth
                      onChange={(e) => this.handleChangeNome(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box>
                    <TextField
                      label="E-mail"
                      fullWidth
                      onChange={(e) => this.handleChangeEmail(e.target.value)}
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
                      onChange={(e) => this.handleChangeCpf(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6} md={6} lg={6}>
                  <Box>
                    <TextField
                      label="Telefone"
                      fullWidth
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
                      onChange={(e) =>
                        this.handleChangeLinkedin(e.target.value)
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContentText>
          </>
        </DialogContent>
        <DialogActions>
          {this.props.children}
          <Button
            variant="contained"
            onClick={(event, value) => this.cadastrarCandidato()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
