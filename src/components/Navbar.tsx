import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Collapse,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from '../assets/logo.png';
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Button from "@mui/material/Button";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedStatus } from "../store/features/user/user";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { navbarStatus } from "../store/features/navbar/navbar";
import { setSnackBar } from "../store/features/snackbar/snackbar";

const drawerWidth = 300;

export default function DrawerAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logged = useSelector((state: RootState) => state.logStatus.logged);
  const navIndex = useSelector((state: RootState) => state.navStatus.index);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [lopen, setLOpen] = React.useState<number | null>(null);

  const handleLClick = (index: number | null) => {
    setLOpen(lopen === index ? null : index);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const logout = () => {
    dispatch(
      loggedStatus({
        logged: false,
        authToken: "",
        name: "",
        email: "",
      })
    );

    localStorage.removeItem("authToken");
    dispatch(setSnackBar({
      message: "Logged out!!!",
      variant: "success"
    }))
    navigate("/");

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href);
    });
  };
  // Drawer item style
  const getDrawerItemStyle = (index: number) => ({
    textAlign: "left",
    backgroundColor: lopen === index ? "black" : "#F9F5F6",
    color: lopen === index ? "#F9F5F6" : "black",
    marginBottom: "0.2rem",
    "&:hover": { backgroundColor: lopen === index ? "black" : "#F9F5F6" },
  });
  const setNavbarIndex = (num: number) => {
    dispatch(
      navbarStatus({
        index: num,
      })
    );
  };

  const drawerItems = [
    {
      name: "Upload Regular Details",
      links: [
        { name: "PUC Details", to: "/PUCUpload" },
        { name: "Engg Details", to: "/EnggUpload" },
      ],
      isCollapsible: true,
    },
    {
      name: "Certificates",
      links: [
        { name: "Single", to: "/Layout1" },
        { name: "Batch", to: "/Layout2" },
      ],
      isCollapsible: true,
    },
    {
      name: "Temporary Certificates",
      links: [{ name: "Temporary", to: "/temporaryCertificate" }],
      isCollapsible: false,
    },
    {
      name: "Student Info",
      links: [{ name: "Student Info", to: "/Results" }],
      isCollapsible: false,
    },
    {
      name: "Rank List",
      links: [{ name: "Rank List By Batch", to: "/RankListByBatch" }],
      isCollapsible: false,
    },
    {
      name: "Grade Sheet",
      links: [{ name: "Grade Sheet", to: "/gradeSheet" }],
      isCollapsible: false,
    },
    {
      name: "Upload Images",
      links: [{ name: "Upload Images", to: "/ZIPFile" }],
      isCollapsible: false,
    },
    {
      name: "Serial Number",
      links: [{ name: "Serial Number", to: "/SerialNo" }],
      isCollapsible: false,
    },
    {
      name: "Backup",
      links: [{ name: "Backup", to: "/Backup" }],
      isCollapsible: false,
    },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center", overflowY: "scroll" }}>
      <Link to="/home" className="link">
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginTop: "10%",
            flexGrow: 1,
            color: "black",
            height: "10%",
          }}
        >
          Examination Cell
        </Typography>
      </Link>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        {drawerItems.map((item, index) => (
          <div key={index}>
            {item.isCollapsible ? (
              <div>
                <ListItemButton
                  sx={getDrawerItemStyle(index + 1)}
                  onClick={() => handleLClick(index + 1)}
                >
                  <ListItemText primary={item.name} />
                  {lopen === index + 1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={lopen === index + 1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.links.map((link, linkIndex) => (
                      <Link to={link.to} className="link" key={linkIndex}>
                        <ListItemButton
                          sx={{
                            pl: 6,
                            fontWeight: "normal",
                          }}
                          selected={navIndex === linkIndex}
                          onClick={() => setNavbarIndex(linkIndex)}
                        >
                          <ListItemText primary={link.name} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              item.links.map((link, linkIndex) => (
                <Link to={link.to} className="link" key={linkIndex}>
                  <ListItemButton sx={getDrawerItemStyle(index + 1)}>
                    <ListItemText primary={link.name} />
                  </ListItemButton>
                </Link>
              ))
            )}
          </div>
        ))}
      </List>
    </Box>
  );

  return logged ? (
    <div className="navbar-div">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            backgroundColor: "#F6F5F2",
            position: "fixed",
            width: "100%",
            boxShadow: "none",
            zIndex: 1200,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
                textAlign: "center",
                marginLeft: 15,
                cursor: ""
              }}
            >
            <Link to="/home" className="link">
              Examination Cell RK Valley
            </Link>
            </Typography>
            <Avatar
              alt="Logo"
              src={logo}
              sx={{
                width: 40,
                height: 40,
                marginRight: "1rem",
                img: { objectFit: "contain" },
              }}
            />
            <Button
              variant="outlined"
              onClick={logout}
              endIcon={<LogoutOutlined />}
              sx={{ color: "black", borderColor: "black" }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                position: "relative",
                overflowY: "hidden",
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  ) : (
    <div></div>
  );
}
