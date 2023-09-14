import React, { Component } from "react";
import {
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
    filtroNome: "",
    filtroEmail: "",
    filtroTelefone: "",
    filtroCPF: "",
  };
  componentDidMount = () => {};

  handleUpdateNome = (value) => {
    this.setState({ filtroNome: value });
  };

  handleUpdateEmail = (value) => {
    this.setState({ filtroEmail: value });
  };

  handleUpdateTelefone = (value) => {
    this.setState({ filtroTelefone: value });
  };

  handleUpdateCPF = (value) => {
    this.setState({ filtroCPF: value });
  };

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
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Nome"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateNome(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Email"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="Telefone"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateTelefone(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 200 }}>
                  <TextField
                    label="CPF"
                    size="small"
                    onKeyUp={(e) => this.handleUpdateCPF(e.target.value)}
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
