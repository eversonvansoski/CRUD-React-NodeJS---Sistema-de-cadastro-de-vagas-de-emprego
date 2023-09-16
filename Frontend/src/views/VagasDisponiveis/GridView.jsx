import React, { Component } from "react";
import { Stack, Button, Grid, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getScreenSize, refreshToken } from "../../utils/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { listarPorFiltro } from "../../services/vagas";
import DialogCandidatar from "./Dialogs/Candidatar";

export default class Historico extends Component {
  state = {
    filtroTitulo: "",
    filtroEmpresa: "",
    filtroRegimeContratacao: "",
    filtroStatus: "",
    vagas: [],
    rows: [],
    msgCandidatarAberta: false,
    dialogId: "",
    dialogNome: "",
  };
  componentDidMount = () => {
    this.listaVagas();
  };

  listaVagas = () => {
    const listItems = listarPorFiltro(
      this.state.filtroTitulo,
      this.state.filtroEmpresa,
      this.state.filtroRegimeContratacao,
      this.state.filtroStatus
    );
    listItems
      .then((data) => {
        let items = [];
        data.data.map(function (item) {
          items = items.concat({
            id: item.id,
            titulo: item.titulo,
            empresa: item.empresa,
            descricao: item.descricao,
            status_vaga_id: item.status_vaga_id,
            regime_contratacao_id: item.regime_contratacao_id,
            status: item.status,
            regime_contratacao: item.regime_contratacao,
          });
        });
        this.setState({
          vagas: items,
          rows: items,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleCloseMsgCandidatar = () => {
    this.setState({ msgCandidatarAberta: false });
  };

  render() {
    let handleOpenMsgCandidatar = (id, nome) => {
      this.setState({
        msgCandidatarAberta: true,
        dialogId: id,
        dialogNome: nome,
      });
    };

    const columns = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "titulo",
        headerName: "Título",
        width: 150,
        editable: false,
      },
      {
        field: "empresa",
        headerName: "Empresa",
        width: 150,
        editable: false,
      },
      {
        field: "regime_contratacao",
        headerName: "Regime de Contratação",
        width: 160,
      },

      {
        field: "status",
        headerName: "Status",
        width: 160,
      },

      {
        field: "acoes",
        headerName: "Ações",
        sortable: false,
        width: 260,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <>
              <Button
                variant="contained"
                color="info"
                onClick={() =>
                  handleOpenMsgCandidatar(params.row.id, params.row.titulo)
                }
              >
                Candidatar
              </Button>
            </>
          );
        },
      },
    ];

    return (
      <>
        <DialogCandidatar
          title={
            <>
              {"Deseja se candidatar à vaga "}
              <u>{this.state.dialogNome}</u> {"?"}
            </>
          }
          id={this.state.dialogId}
          open={this.state.msgCandidatarAberta}
          handleCloseMsg={this.handleCloseMsgCandidatar}
          listaVagas={this.listaVagas}
        >
          <Button onClick={this.handleCloseMsgCandidatar}>Cancelar</Button>
        </DialogCandidatar>

        <Stack>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{ minHeight: getScreenSize().h - 300 + "px" }}
            >
              <DataGrid
                disableColumnMenu
                rows={this.state.rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Grid>
          </Grid>
        </Stack>
      </>
    );
  }
}
