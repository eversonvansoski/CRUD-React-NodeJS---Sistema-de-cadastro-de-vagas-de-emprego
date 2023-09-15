import React, { Component } from "react";
import {
  Autocomplete,
  TextField,
  Stack,
  Button,
  FormControl,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { getScreenSize, refreshToken } from "../../utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default class Historico extends Component {
  state = {
    filtroTitulo: "",
    filtroEmpresa: "",
    filtroRegimeContratacao: "",
    filtroStatus: "",
  };
  componentDidMount = () => {};

  handleUpdateTitulo = (value) => {
    this.setState({ filtroTitulo: value });
  };

  handleUpdateEmpresa = (value) => {
    this.setState({ filtroEmpresa: value });
  };

  handleUpdateRegimeContratacao = (value) => {
    this.setState({ filtroRegimeContratacao: value });
  };

  handleUpdateStatus = (value) => {
    this.setState({ filtroStatus: value });
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
      {
        field: "acoes",
        headerName: "Ações",
        sortable: false,
        width: 130,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <>
              <IconButton
                color="secondary"
                sx={{ cursor: "pointer" }}
                //onClick={() => handleOpenMsgExibir(params.row.id, [{}])}
              >
                <VisibilityIcon />
              </IconButton>

              <IconButton
                color="primary"
                sx={{ cursor: "pointer" }}
                //onClick={() => handleOpenMsgEditar(params.row.id, [{}])}
              >
                <EditIcon color="info" />
              </IconButton>

              <IconButton
                color="error"
                sx={{ cursor: "pointer" }}
                //onClick={() => handleOpenMsgExcluir(params.row.id, [{}])}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
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
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Título"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateTitulo(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Empresa"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateEmpresa(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Regime Contratação"
                    size="small"
                    onKeyUp={(e) =>
                      this.handleUpdateRegimeContratacao(e.target.value)
                    }
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Status"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateStatus(e.target.value)}
                  />
                </FormControl>

                <FormControl sx={{ mb: 1, mr: 1, minWidth: 120 }}>
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
