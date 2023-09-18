import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { incluirCandidatura } from "../../../services/vagas";
import { getDataToken } from "../../../utils/utils";

export default class Index extends Component {
  state = {
    erro: false,
    msgErro: "",
  };

  handleCandidatar = (id) => {
    const dataToken = getDataToken();
    const service = incluirCandidatura(id, dataToken.id);
    service
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

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleCloseMsg}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle>
          {this.props.title}
          {this.msgError()}
        </DialogTitle>

        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          {this.props.children}
          <Button
            variant="contained"
            onClick={() => this.handleCandidatar(this.props.id)}
          >
            Confirmar Candidatura
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
