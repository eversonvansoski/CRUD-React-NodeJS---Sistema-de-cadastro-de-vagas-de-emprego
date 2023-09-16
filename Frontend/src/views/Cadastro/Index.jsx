import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Divider,
  TextField,
  CardContent,
  Alert,
} from "@mui/material";
import { Component } from "react";
import { criar } from "../../services/cadastro";

export default class Index extends Component {
  state = { email: "", nome: "", senha: "", novaSenha: "" };

  cadastrar = () => {
    const listItems = criar(
      this.state.email,
      this.state.nome,
      this.state.senha,
      this.state.novaSenha
    );
    listItems
      .then((data) => {
        this.setState({ msg: data.data.msg });
        if (!data.data.success) {
          this.setState({ erro: true });
        } else {
          document.location = "./";
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

  handleChangeNome = (value) => {
    this.setState({ nome: value });
  };

  handleChangeEmail = (value) => {
    this.setState({ email: value });
  };
  handleChangeSenha = (value) => {
    this.setState({ senha: value });
  };
  handleChangeConfirmarSenha = (value) => {
    this.setState({ novaSenha: value });
  };

  render() {
    return (
      <>
        <Grid
          container
          sx={{
            top: 0,
            bottom: 0,
            position: "fixed",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={10} sm={10} md={4}>
            <Card sx={{ backgroundColor: "#fff" }}>
              <CardContent>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, width: 80, height: 80 }} src={""} />
                  </Box>
                </Grid>

                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Nome"
                      type="text"
                      onKeyUp={(e) => this.handleChangeNome(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      type="text"
                      onKeyUp={(e) => this.handleChangeEmail(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ mt: 1, ml: { md: 2 }, mr: { md: 2 } }}>
                    <Divider variant="large" />
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Senha"
                      type="password"
                      onKeyUp={(e) => this.handleChangeSenha(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Confirmar Senha"
                      type="password"
                      onKeyUp={(e) =>
                        this.handleChangeConfirmarSenha(e.target.value)
                      }
                    />
                  </Box>
                </Grid>

                <Grid item square xs={12} sm={12} md={12} mt={3}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={(e) => this.cadastrar(e.target.value)}
                    >
                      Criar Cadastro
                    </Button>
                  </Box>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    {this.msgError()}
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}
