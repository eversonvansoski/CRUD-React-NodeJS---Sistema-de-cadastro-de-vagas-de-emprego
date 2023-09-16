import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { editar } from "../../../services/vagas";

export default class Index extends Component {
  state = {
    titulo: "",
    empresa: "",
    descricao: "",
    regimeContratacao: 0,
    erro: false,
    msgErro: "",
  };

  editarVaga = () => {
    if (this.props.data) {
      this.props.data.map((item) => {
        const listItems = editar(
          this.props.id,
          this.state.titulo ? this.state.titulo : item.titulo,
          this.state.empresa ? this.state.empresa : item.empresa,
          this.state.descricao ? this.state.descricao : item.descricao,
          this.state.regimeContratacao
            ? this.state.regimeContratacao
            : item.regime_contratacao_id
        );
        listItems
          .then((data) => {
            if (!data.data.success) {
              this.setState({ erro: true, msgErro: data.data.msg });
            } else {
              this.props.handleCloseMsg();
              this.props.listaVagas();
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

  handleChangeTitulo = (value) => {
    this.setState({ titulo: value });
  };
  handleChangeEmpresa = (value) => {
    this.setState({ empresa: value });
  };
  handleChangeDescricao = (value) => {
    this.setState({ descricao: value });
  };
  handleChangeRegimeContratacao = (value) => {
    this.setState({ regimeContratacao: value });
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
                          label="Titulo"
                          fullWidth
                          defaultValue={item.titulo}
                          onChange={(e) =>
                            this.handleChangeTitulo(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <TextField
                          label="Empresa"
                          fullWidth
                          defaultValue={item.empresa}
                          onChange={(e) =>
                            this.handleChangeEmpresa(e.target.value)
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box>
                        <TextField
                          label="Descricao"
                          fullWidth
                          defaultValue={item.descricao}
                          onChange={(e) =>
                            this.handleChangeDescricao(e.target.value)
                          }
                          rows={5}
                          multiline
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <FormControl>
                          <FormLabel id="regime">
                            Regime de Contratação
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="regime"
                            name="row-radio-buttons-group"
                            defaultValue={item.regime_contratacao_id}
                            onChange={(e) =>
                              this.handleChangeRegimeContratacao(e.target.value)
                            }
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="CLT"
                            />
                            <FormControlLabel
                              value={2}
                              control={<Radio />}
                              label="Pessoa Jurídica"
                            />
                            <FormControlLabel
                              value={3}
                              control={<Radio />}
                              label="Freelancer"
                            />
                          </RadioGroup>
                        </FormControl>
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
            onClick={(event, value) => this.editarVaga()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
