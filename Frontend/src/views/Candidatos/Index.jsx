import React, { Component } from "react";
import { Grid } from "@mui/material";
import GridView from "./GridView";
import { setTitle, setLastPage } from "../../utils/utils";

export default class Index extends Component {
  state = {
    items: [],
  };
  componentDidMount = () => {
    setTitle(this.props.title);
    setLastPage();
  };
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <GridView />
        </Grid>
      </Grid>
    );
  }
}
