import React, { Component } from "react";
import { Grid, Stack, Card, CardContent, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAll as getAllClientes } from "../../../services/usuarios";
import { getScreenSize, refreshToken } from "../../../utils/utils";
import TableSkeleton from "../../../components/skeleton/table";
import { getAllByClient } from "../../../services/reports";

export default class Historico extends Component {
  state = {
    clientes: [],
    rows: [],
    rowsFiltro: [],
    loading: false,
  };
  componentDidMount = () => {
    this.listAcessosClientes();
    this.listUsuarios();
  };

  listAcessosClientes = () => {
    this.setState({ loading: true });
    let rows = [];
    getAllByClient()
      .then((data) => {
        data.data.map(function (item) {
          rows = rows.concat({
            id: Math.random(),
            userName: item.userName,
            userKey: item.userKey,
            currentMonthResult: item.currentMonthResult,
            resultOfThePreviousMonth: item.resultOfThePreviousMonth,
            averageSessionTime: item.averageSessionTime,
          });
        });
        console.log(rows);
        this.setState({ rows: rows, loading: false });
      })
      .catch((e) => {});
  };

  listUsuarios = () => {
    const listItems = getAllClientes();
    listItems
      .then((data) => {
        let items = data.data.map(function (item) {
          return {
            id: item.id,
            cpfCnpj: item.userKey,
          };
        });

        this.setState({ clientes: items, loading: false });
      })
      .catch((e) => {
        e.response.status === 401 && refreshToken();
      });
  };

  handleChangeUsuario = (value) => {
    if (value) {
      this.setState({ assinaturaId: value.id });
    } else {
      this.setState({ assinaturaId: 0 });
    }
  };

  render() {
    const columns = [
      {
        field: "userName",
        headerName: "Nome",
        flex: 1,
        minWidth: 200,
      },
      { field: "userKey", headerName: "CPF/CNPJ", flex: 1, minWidth: 100 },
      {
        field: "resultOfThePreviousMonth",
        headerName: "Últimos 30 Dias",
        flex: 1,
        type: "number",
        maxWidth: 150,
        textAlign: "center",
      },
      {
        field: "currentMonthResult",
        headerName: "Neste Mês",
        flex: 1,
        type: "number",
        maxWidth: 120,
      },
      {
        field: "averageSessionTime",
        headerName: "Tempo média de sessão (s)",
        flex: 1,
        type: "number",
        maxWidth: 120,
      },
    ];

    return (
      <>
        <Stack>
          <Grid container>
            {this.state.loadingFilter && (
              <Grid item xs={12} md={12} lg={12}>
                <LinearProgress />
              </Grid>
            )}
            {this.state.loading ? (
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <CardContent>
                    <TableSkeleton />
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{ minHeight: getScreenSize().h - 300 + "px" }}
              >
                <DataGrid
                  /*              components={{
                  ColumnMenu: CustomColumnMenu,
                }} */
                  disableColumnMenu
                  rows={this.state.rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </>
    );
  }
}
