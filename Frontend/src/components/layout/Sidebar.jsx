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
import { getDataToken } from "../../utils/utils";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

export default function Sidebar(props) {
  const rota = window.location.pathname;
  const dataToken = getDataToken();

  console.log(rota);
  return (
    <List>
      {dataToken.tipoId === 1 && (
        <>
          {" "}
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
        </>
      )}
      {dataToken.tipoId === 2 && (
        <>
          <Link
            to={"../MinhasVagas"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon
                    component={PersonIcon}
                    color={rota === "/MinhasVagas" ? "primary" : ""}
                  />
                </ListItemIcon>
                <ListItemText primary={"Minhas Vagas"} />
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
                <ListItemText primary={"Vagas Disponiveis"} />
              </ListItemButton>
            </ListItem>
          </Link>
        </>
      )}
    </List>
  );
}
