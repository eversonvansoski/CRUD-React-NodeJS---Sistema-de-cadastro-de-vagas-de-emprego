import React, { Component } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import Content from "./Content";
import { setTitle } from "../../utils/utils";

export default class Index extends Component {
  state = {
    items: [],
  };
  componentDidMount = () => {
    setTitle(this.props.title);
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <CardContent>
              <Content />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
