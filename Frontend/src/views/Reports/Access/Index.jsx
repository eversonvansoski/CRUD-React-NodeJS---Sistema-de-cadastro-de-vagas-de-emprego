import React, { Component } from "react";
import { useEffect } from "react";
import { Grid, Box, Tabs, Tab } from "@mui/material";

import AcessosPorCliente from "./AcessosPorCliente";
import AcessosPorConteudo from "./AcessosPorConteudo";
import { setTitle } from "../../../utils/utils";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    //setTitle(this.props.title);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Acessos por Cliente" />
            <Tab label="Acessos por Conteudo" />
          </Tabs>
        </Box>
        <Box mt={1}>
          {value === 0 && <AcessosPorCliente />}
          {value === 1 && <AcessosPorConteudo />}
        </Box>
      </Grid>
    </Grid>
  );
}
