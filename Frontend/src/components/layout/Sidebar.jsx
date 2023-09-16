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
import PersonIcon from "@mui/icons-material/Person";

export default function Sidebar(props) {
  const rota = window.location.pathname;

  console.log(rota);
  return (
    <List>
      <Link
        to={"../AdmVagas"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                component={SearchIcon}
                color={rota === "/AdmVagas" ? "primary" : ""}
              />
            </ListItemIcon>
            <ListItemText primary={"Vagas"} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        to={"../MinhasVagas"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                component={SearchIcon}
                color={rota === "/MinhasVagas" ? "primary" : ""}
              />
            </ListItemIcon>
            <ListItemText primary={"Vagas"} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        to={"../VagasDisponiveis"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                component={SearchIcon}
                color={rota === "/VagasDisponiveis" ? "primary" : ""}
              />
            </ListItemIcon>
            <ListItemText primary={"Vagas"} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link
        to={"../AdmCandidatos"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                component={GroupIcon}
                color={rota === "/AdmCandidatos" ? "primary" : ""}
              />
            </ListItemIcon>
            <ListItemText primary={"Candidatos"} />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}
