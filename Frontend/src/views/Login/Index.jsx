import {
  Avatar,
  Box,
  Button,
  Card,
  FormControlLabel,
  Switch,
  Grid,
  Divider,
  Link,
  TextField,
  Typography,
  CardContent,
  Alert,
  LinearProgress,
} from "@mui/material";
import { Component } from "react";
import { auth } from "../../services/login";
import { TokenValidate } from "../../services/usuarios";
import { setTitle } from "../../utils/utils";

export default class Index extends Component {
  state = {};

  componentDidMount = (value) => {};

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
                      onKeyUp={(e) => this.handleUsuario(e.target.value)}
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
                      onKeyUp={(e) => this.handleSenha(e.target.value)}
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
