import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { excluir } from "../../../services/vagas";

export default class Index extends Component {
  handleExcluir = (id) => {
    const service = excluir(id);
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

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleCloseMsg}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle>{this.props.title}</DialogTitle>

        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          {this.props.children}
          <Button
            variant="contained"
            onClick={() => this.handleExcluir(this.props.id)}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
