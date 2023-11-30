import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LayersIcon from "@mui/icons-material/Layers";
import Person from "@mui/icons-material/Person";
import StorageIcon from "@mui/icons-material/Storage";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};
export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    onDrawerClose();
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          boxShadow: "0 0 9px rgba(228, 230, 235,.9),inset 0 0 9px rgba(228, 230, 235,.4)",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="center">
          <img src={`${process.env.PUBLIC_URL}/images/keyhub-pro-black.png`} height={64} style={{ marginRight: 40 }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Typography variant="h6" textAlign="center">
        Keyhub Pro
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding component={NavLink} to="/stock" sx={{ color: "black" }}>
          <ListItemButton>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={NavLink} to="/key" sx={{ color: "black" }}>
          <ListItemButton>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Keysoftware" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={NavLink} to="/1" sx={{ color: "black" }}>
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="AbootUS" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
