import * as React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded"
import { NavLink } from "react-router-dom"

export function Sidebar() {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink to="/admin/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/admin/students/list">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisorAccountRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
      <Divider />
    </Box>
  )
}
