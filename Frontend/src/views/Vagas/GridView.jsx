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
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getByFilter } from "../../services/vagas";
import DialogExcluir from "./Dialogs/Excluir";
import DialogEditar from "./Dialogs/Editar";
import DialogInserir from "./Dialogs/Inserir";
import DialogExibir from "./Dialogs/Exibir";

export default class Historico extends Component {
  state = {
    filtroTitulo: "",
    filtroEmpresa: "",
    filtroRegimeContratacao: "",
    filtroStatus: "",
    vagas: [],
    rows: [],
    msgInserirAberta: false,
    msgExibirAberta: false,
    msgExcluirAberta: false,
    msgEditarAberta: false,
    dialogId: "",
    dialogNome: "",
    dialogData: [],
  };
  componentDidMount = () => {
    this.listaVagas();
  };

  listaVagas = () => {
    const listItems = getByFilter(
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

  handleOpenMsgInserir = () => {
    this.setState({ msgInserirAberta: true });
  };

  handleCloseMsgExibir = () => {
    this.setState({ msgExibirAberta: false });
  };
  handleCloseMsgExcluir = () => {
    this.setState({ msgExcluirAberta: false });
  };
  handleCloseMsgEditar = () => {
    this.setState({ msgEditarAberta: false });
  };
  handleCloseMsgInserir = () => {
    this.setState({ msgInserirAberta: false });
  };

  render() {
    let handleOpenMsgExcluir = (id, nome) => {
      this.setState({
        msgExcluirAberta: true,
        dialogId: id,
        dialogNome: nome,
      });
    };
    let handleOpenMsgEditar = (id, data) => {
      this.setState({
        msgEditarAberta: true,
        dialogId: id,
        dialogData: data,
      });
    };
    let handleOpenMsgExibir = (id, data) => {
      this.setState({
        msgExibirAberta: true,
        dialogId: id,
        dialogData: data,
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
        width: 130,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <>
              <IconButton
                color="secondary"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleOpenMsgExibir(params.row.id, [
                    {
                      titulo: params.row.titulo,
                      empresa: params.row.empresa,
                      descricao: params.row.descricao,
                      status: params.row.status,
                      regime_contratacao: params.row.regime_contratacao,
                    },
                  ])
                }
              >
                <VisibilityIcon />
              </IconButton>

              <IconButton
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleOpenMsgEditar(params.row.id, [
                    {
                      titulo: params.row.titulo,
                      empresa: params.row.empresa,
                      descricao: params.row.descricao,
                      regime_contratacao_id: params.row.regime_contratacao_id,
                    },
                  ])
                }
              >
                <EditIcon color="info" />
              </IconButton>

              <IconButton
                color="error"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleOpenMsgExcluir(params.row.id, params.row.titulo)
                }
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ];

    return (
      <>
        <DialogExcluir
          title={
            <>
              {"Deseja excluir a vaga "}
              <u>{this.state.dialogNome}</u> {"?"}
            </>
          }
          id={this.state.dialogId}
          open={this.state.msgExcluirAberta}
          handleCloseMsg={this.handleCloseMsgExcluir}
          listaVagas={this.listaVagas}
        >
          <Button onClick={this.handleCloseMsgExcluir}>Cancelar</Button>
        </DialogExcluir>

        <DialogEditar
          title="Editar Vaga"
          id={this.state.dialogId}
          data={this.state.dialogData}
          open={this.state.msgEditarAberta}
          handleCloseMsg={this.handleCloseMsgEditar}
          listaVagas={this.listaVagas}
        >
          <Button onClick={this.handleCloseMsgEditar}>Cancelar</Button>
        </DialogEditar>
        <DialogInserir
          title="Cadastrar Vaga"
          open={this.state.msgInserirAberta}
          handleCloseMsg={this.handleCloseMsgInserir}
          listaVagas={this.listaVagas}
        >
          <Button onClick={this.handleCloseMsgInserir}>Cancelar</Button>
        </DialogInserir>
        <DialogExibir
          title="Detalhe da Vaga"
          data={this.state.dialogData}
          open={this.state.msgExibirAberta}
          handleCloseMsg={this.handleCloseMsgExibir}
          listaVagas={this.listaVagas}
        >
          <Button onClick={this.handleCloseMsgExibir}>Fechar</Button>
        </DialogExibir>
        <Stack>
          <Grid container>
            <Grid item xs={10} md={10} lg={10}>
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
                    color="info"
                    endIcon={<FilterAltOutlinedIcon />}
                    onClick={() => this.listaVagas()}
                  >
                    Filtrar
                  </Button>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <Box sx={{ textAlign: "right" }}>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 120 }} size="small">
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => this.handleOpenMsgInserir()}
                  >
                    Cadastrar Vaga
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
