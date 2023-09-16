import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";

export default class Index extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleCloseMsg}
        fullWidth
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          {console.log(this.props)}
          {this.props &&
            this.props.data &&
            this.props.data.map((item) => (
              <>
                <DialogContentText>
                  <Grid container spacing={3} mt={0}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <b>Título:</b>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>{item.titulo}</Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mt={0}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <b>Empresa:</b>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>{item.empresa}</Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mt={0}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <b>Regime de Contratação:</b>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>{item.regime_contratacao}</Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mt={0}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>
                        <b>Status da Vaga:</b>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Box>{item.status}</Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box>
                        <b>Descrição da vaga:</b>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box>{item.descricao}</Box>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </>
            ))}
        </DialogContent>
        <DialogActions>{this.props.children}</DialogActions>
      </Dialog>
    );
  }
}
