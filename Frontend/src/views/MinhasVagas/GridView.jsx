import React, { Component } from "react";
import { Stack, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getScreenSize } from "../../utils/utils";
import { listarPorFiltro } from "../../services/vagas";

export default class Historico extends Component {
  state = {
    filtroTitulo: "",
    filtroEmpresa: "",
    filtroRegimeContratacao: "",
    filtroStatus: "",
    vagas: [],
    rows: [],
    dialogId: "",
    dialogNome: "",
    dialogData: [],
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
  render() {
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
    ];

    return (
      <>
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
