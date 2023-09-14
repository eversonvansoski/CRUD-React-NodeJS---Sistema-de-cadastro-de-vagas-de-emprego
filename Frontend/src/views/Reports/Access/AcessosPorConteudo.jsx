import React, { Component } from "react";
import { Grid, Stack, Card, CardContent, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAll as getAllClientes } from "../../../services/usuarios";
import { getScreenSize, refreshToken } from "../../../utils/utils";
import TableSkeleton from "../../../components/skeleton/table";
import { getAllByContent } from "../../../services/reports";

export default class Historico extends Component {
  state = {
    clientes: [],
    rows: [],
    rowsFiltro: [],
    loading: false,
  };
  componentDidMount = () => {
    this.listAccessByContent();
    this.listUsuarios();
  };

  listAccessByContent = (pageModel) => {
    this.setState({ loading: true });

    getAllByContent().then((res) => {
      let temp = [];
      res.data.forEach((d) => {
        if (d.content) {
          temp.push({
            id: d.content.id,
            currentMonthResult: d.currentMonthResult,
            resultOfThePreviousMonth: d.resultOfThePreviousMonth,
            brand: d.content.brand.name,
            vehicle: d.content.vehicle.name,
            vehicleVersion: d.content.vehicleVersion.version,
            vehicleYear: d.content.vehicleYear.year,
            vehicleYearEnd: d.content.vehicleYearEnd.year,
            engine: d.content.engine.description,
            category: d.content.category.description,
            subCategory: d.content.subCategory.description,
          });
        }
      });
      this.setState({
        rows: temp,
        loading: false,
      });
    });
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

        this.setState({ clientes: items });
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
      { field: "brand", headerName: "Marca", minWidth: 150, flex: 1 },
      { field: "vehicle", headerName: "Modelo", minWidth: 150, flex: 1 },
      { field: "vehicleVersion", headerName: "Versão", minWidth: 100, flex: 1 },
      { field: "vehicleYear", headerName: "Ano Ini", minWidth: 70, flex: 1 },
      { field: "vehicleYearEnd", headerName: "Ano Fim", minWidth: 70, flex: 1 },
      { field: "engine", headerName: "Motor" },
      { field: "category", headerName: "Categoria", minWidth: 190, flex: 1 },
      {
        field: "subCategory",
        headerName: "Subcategoria",
        minWidth: 190,
        flex: 1,
      },
      {
        field: "resultOfThePreviousMonth",
        headerName: "Últimos 30 Dias",
        flex: 1,
        type: "number",
        maxWidth: 150,
      },
      {
        field: "currentMonthResult",
        headerName: "Neste Mês",
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
                  //paginationMode="server"
                  //onPageChange={this.listAccessByContent}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </>
    );
  }
}
