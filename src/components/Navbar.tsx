import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const drawerWidth = 300;

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [disableDrawer, setDisableDrawer] = React.useState(false);
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

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const [lopen, setLOpen] = React.useState(1);

  const handleLClick = (index: number) => {
    setLOpen(index);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }} >
      <Typography
        variant="h6"
        component="div"
        sx={{
          marginTop: "10%",
          flexGrow: 1,
          color: "black",
          height: "30%",
        }}
      >
        Examination Cell
      </Typography>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          sx={{
            textAlign: "center",
            backgroundColor: lopen == 1 ? "black" : "#F9F5F6",
            color: lopen == 1 ? "#F9F5F6" : "black",
            marginBottom: "0.2rem",
            "&:hover": { backgroundColor: lopen == 1 ? "black" : "#F9F5F6" },
          }}
          onClick={() => {
            {
              lopen != 1 ? handleLClick(1) : handleLClick(0);
            }
          }}
        >
          <ListItemText primary="Upload Regular Details" />
          {lopen == 1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={lopen === 1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"/PucUpload"} className="link">
              <ListItemButton
                sx={{ pl: 6 }}
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="PUC Details" />
              </ListItemButton>
            </Link>
            <Link to={"/EnggUpload"} className="link">
              <ListItemButton
                sx={{ pl: 6 }}
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText primary="Engg Details" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            textAlign: "center",
            backgroundColor: lopen == 2 ? "black" : "#F9F5F6",
            color: lopen == 2 ? "#F9F5F6" : "black",
            marginBottom: "0.2rem",
            "&:hover": { backgroundColor: lopen == 2 ? "black" : "#F9F5F6" },
          }}
          onClick={() => {
            lopen != 2 ? handleLClick(2) : handleLClick(0);
          }}
        >
          <ListItemText primary="Upload Remidial Details" />
          {lopen == 2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={lopen === 2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 6 }}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemText primary="PUC Details " />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 6 }}
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemText primary="Engg Details" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            textAlign: "center",
            backgroundColor: lopen == 3 ? "black" : "#F9F5F6",
            color: lopen == 3 ? "#F9F5F6" : "black",
            marginBottom: "0.2rem",
            "&:hover": { backgroundColor: lopen == 3 ? "black" : "#F9F5F6" },
          }}
          onClick={() => {
            lopen != 3 ? handleLClick(3) : handleLClick(0);
          }}
        >
          <ListItemText primary="Certificates" />
          {lopen == 3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={lopen === 3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"/Layout1"} className="link">
              <ListItemButton
                sx={{ pl: 6 }}
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemText primary="Single" />
              </ListItemButton>
            </Link>
            <Link to={"/Layout2"} className="link">
              <ListItemButton
                sx={{ pl: 6 }}
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
              >
                <ListItemText primary="Batch" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to="/temporaryCertificate" className="link" >
          <ListItemButton
            sx={{
              textAlign: "center",
              pl: 6,
              marginBottom: "0.2rem",
              backgroundColor: lopen === 7 ? "black" : "#F9F5F6",
              color: lopen === 7 ? "#F9F5F6" : "black",
            }}
            selected={selectedIndex === 7}
            
          >
            <ListItemText primary="Temporary Certificates" />
          </ListItemButton>
        </Link>

        <Link to="/gradeSheet" className="link" >
          <ListItemButton
            sx={{
              textAlign: "center",
              pl: 6,
              marginBottom: "0.2rem",
              backgroundColor: lopen === 7 ? "black" : "#F9F5F6",
              color: lopen === 7 ? "#F9F5F6" : "black",
            }}
            selected={selectedIndex === 7}
            
          >
            <ListItemText primary="Grade Sheet" />
          </ListItemButton>
        </Link>

        <Link to="/ZIPFile" className="link" >
          <ListItemButton
            sx={{
              textAlign: "center",
              pl: 6,
              marginBottom: "0.2rem",
              backgroundColor: lopen === 7 ? "black" : "#F9F5F6",
              color: lopen === 7 ? "#F9F5F6" : "black",
            }}
            selected={selectedIndex === 7}
            
          >
            <ListItemText primary="Upload Images" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );

  // const container =window !== undefined ? () => window().document.body : undefined;

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
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {
              !disableDrawer &&
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            }
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
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
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            // container={}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
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
