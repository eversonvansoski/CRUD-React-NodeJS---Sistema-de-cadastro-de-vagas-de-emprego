import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Link,
  TextField,
  CardContent,
  Alert,
  LinearProgress,
} from "@mui/material";
import { Component } from "react";
import { auth } from "../../services/login";
import { getDataToken } from "../../utils/utils";

export default class Index extends Component {
  state = { email: "", senha: "", msg: "", erro: false };

  handleLogin = () => {
    const listItems = auth(this.state.email, this.state.senha);
    listItems
      .then(async (data) => {
        this.setState({ msg: data.data.msg });
        if (!data.data.success) {
          this.setState({ erro: true });
        } else {
          localStorage.setItem("token", data.data.msg);
          let tipoId = getDataToken();
          document.location = tipoId === 1 ? "./AdmVagas" : "./MinhasVagas";
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

  handleChangeEmail = (value) => {
    this.setState({ email: value });
  };
  handleChangeSenha = (value) => {
    this.setState({ senha: value });
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
            backgroundSize: "cover",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={10} sm={10} md={4}>
            <Card sx={{ backgroundColor: "#fff" }}>
              {this.state.loading && <LinearProgress />}

              <CardContent>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, width: 80, height: 80 }} />
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      onKeyUp={(e) => this.handleChangeEmail(e.target.value)}
                    />
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
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }} mt={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => this.handleLogin()}
                    >
                      Entrar
                    </Button>
                  </Box>
                </Grid>

                <Grid item square xs={12} sm={12} md={12}>
                  <Box sx={{ ml: { md: 2 }, mr: { md: 2 } }} mt={3}>
                    <Link href={"../Cadastro"}>Criar Cadastro</Link>
                  </Box>
                </Grid>
                <Grid item square xs={12} sm={12} md={12}>
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
