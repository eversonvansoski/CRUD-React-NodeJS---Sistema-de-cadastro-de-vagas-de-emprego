import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteContent } from "../../../services/conteudos";
import { refreshToken } from "../../../utils/utils";

export default class Index extends Component {
  state = {};

  handleExcluir = (id) => {
    const service = deleteContent(id);
    service
      .then((data) => {
        this.props.handleCloseMsgExcluir();
        this.props.listConteudos();
      })
      .catch((e) => {
        e.response.status === 401 && refreshToken();
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
        <DialogTitle>Confirmar a exclusão do candidato?</DialogTitle>

        <DialogContent>
          <DialogContentText>{this.props.nome}</DialogContentText>
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
