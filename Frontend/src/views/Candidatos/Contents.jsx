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
        field: "nome",
        headerName: "Nome",
        width: 150,
        editable: false,
      },
      {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: false,
      },
      {
        field: "telefone",
        headerName: "Telefone",
        width: 150,
        editable: false,
      },
      {
        field: "cpf",
        headerName: "CPF",
        width: 150,
        editable: false,
      },
      {
        field: "linkedin",
        headerName: "Linkedin",
        width: 160,
      },
    ];

    const rows = [
      {
        id: 1,
        nome: "Everson Vansoski",
        email: "eversonvansoski@gmail.com",
        telefone: "31988885555",
        cpf: "12345678900",
        linkedin: "https://linkedin.com",
      },
      {
        id: 2,
        nome: "Joao Silva",
        email: "joalsilva@gmail.com",
        telefone: "31986458888",
        cpf: "32145678900",
        linkedin: "https://linkedin.com",
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
