import React, { Component } from "react";
import {
  Autocomplete,
  TextField,
  Stack,
  Button,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { getScreenSize, refreshToken } from "../../utils/utils";

export default class Historico extends Component {
  state = {};
  componentDidMount = () => {};

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

    const rows = [
      {
        id: 1,
        titulo: "Dev jr",
        empresa: "Waux",
        regime_contratacao: "CLT",
        status: "Ativa",
      },
      {
        id: 2,
        titulo: "Dev sr",
        empresa: "Waux",
        regime_contratacao: "PJ",
        status: "Ativa",
      },
    ];
    return (
      <>
        <Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Box>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }} size="small">
                  <Autocomplete
                    onChange={(event, value) => this.handleChange(value)}
                    onInputChange={(event, value) => this.handleChange(value)}
                    size="small"
                    options={this.state.rowsFiltro}
                    getOptionLabel={(option) => option.nome}
                    renderInput={(params) => (
                      <TextField {...params} label="Usuário" />
                    )}
                  />
                </FormControl>

                <FormControl sx={{ mb: 1, mr: 1, minWidth: 120 }} size="small">
                  <Button
                    variant="contained"
                    endIcon={<FilterAltOutlinedIcon />}
                    onClick={() => this.listUsuarios()}
                  >
                    Filtrar
                  </Button>
                </FormControl>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{ minHeight: getScreenSize().h - 300 + "px" }}
            >
              <DataGrid
                disableColumnMenu
                rows={rows}
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
