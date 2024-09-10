import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          marginTop: "10%",
          flexGrow: 1,
          color: "black",
          display: { xs: "block", sm: "none" },
          height: "30%",
        }}
      >
        Examination Cell
      </Typography>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "1.25rem !important" }}>
                  Home
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "1.25rem !important" }}>
                  About
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "1.25rem !important" }}>
                  Contact
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="navbar-div">
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{ backgroundColor: "#F6F5F2 ", position: "fixed" }}
        >
          <Toolbar
            sx={{ justifyContent: { xs: "space-between", sm: "start" } }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
                display: { xs: "block", sm: "none" },
                textAlign: "center",
              }}
            >
              Examination Cell
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://th.bing.com/th/id/R.5f4a536e09c111530b7aaae0f3181db3?rik=BvkIzGduEF%2foEw&riu=http%3a%2f%2fwww.rgukt.in%2fimages%2fLogonew.png&ehk=233hO90aIpxhCitQWTAzX2WCze82Sl8ZNNKF956t%2f8Q%3d&risl=&pid=ImgRaw&r=0"
              sx={{
                width: 40,
                height: 40,
                marginRight: "1rem",
                img: { objectFit: "contain" },
              }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
                display: { xs: "none", sm: "block" },
              }}
            >
              Examination Cell
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link to="/">
                <Button sx={{ color: "black" }}>XLSX</Button>
              </Link>{" "}
              <Link to="/ZipFile">
                <Button sx={{ color: "black" }}>Zip</Button>
              </Link>{" "}
              <Link to="/Layout1">
                <Button sx={{ color: "black" }}>Layout 1</Button>
              </Link>{" "}
              <Link to="/Layout2">
                <Button sx={{ color: "black" }}>Layout 2</Button>
              </Link>
              <Typography
                sx={{
                  marginLeft: "1rem",
                  marginRight: "0.5rem",
                  flexGrow: 1,
                  color: "#405D72",
                  fontSize: "0.9rem",
                  display: { xs: "none", sm: "inline" },
                  textAlign: "center",
                  "&:hover": { cursor: "pointer" },
                }}
              >
                User name
              </Typography>
              <IconButton
                sx={{
                  backgroundColor: "black",
                  padding: 0,
                  "&:hover": { backgroundColor: "black" },
                }}
                onClick={handleClick}
              >
                <AccountCircleSharpIcon sx={{ height: 1, color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
}
