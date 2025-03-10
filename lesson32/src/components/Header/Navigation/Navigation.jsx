import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, List, ListItem, ListItemText } from "@mui/material";

export function Navigation({ navAttrs }) {
  return (
    <AppBar position="static" {...navAttrs}>
      <Toolbar>
        <List sx={{ display: "flex", paddingLeft: 0 }}>
          <ListItem>
            <NavLink
              to="/"
              style={({ isActive, isPending }) => ({
                textDecoration: "none",
                color: isActive ? "white" : isPending ? "gray" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              <ListItemText primary="Home" />
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="/swapi"
              style={({ isActive, isPending }) => ({
                textDecoration: "none",
                color: isActive ? "white" : isPending ? "gray" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              <ListItemText primary="SWAPI" />
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="/todo"
              style={({ isActive, isPending }) => ({
                textDecoration: "none",
                color: isActive ? "white" : isPending ? "gray" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              <ListItemText primary="TODO" />
            </NavLink>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
