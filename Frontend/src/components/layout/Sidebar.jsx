import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";

export default function Sidebar(props) {
  return (
    <List>
      <Link
        to={"../Vagas"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                sx={{
                  color:
                    window.location.pathname === "Vagas"
                      ? "primary"
                      : "#96a5c1",
                }}
                component={SearchIcon}
                color={window.location.pathname === "Vagas" ? "primary" : ""}
              />
            </ListItemIcon>
            <ListItemText primary={"Vagas"} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        to={"../Candidatos"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                sx={{
                  color:
                    window.location.pathname === "Candidatos"
                      ? "primary"
                      : "#96a5c1",
                }}
                component={GroupIcon}
                color={
                  window.location.pathname === "Candidatos" ? "primary" : ""
                }
              />
            </ListItemIcon>
            <ListItemText primary={"Candidatos"} />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}
