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
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const drawerWidth = 300;

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [lopen, setLOpen] = React.useState<number | null>(null);  // Handle expanded sections
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null); // Handle active sub-section

  const handleLClick = (index: number | null) => {
    setLOpen(lopen === index ? null : index); // Toggle dropdown
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index); // Set active sub-section
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Drawer item style
  const getDrawerItemStyle = (index: number) => ({
    textAlign: "center",
    backgroundColor: lopen === index ? "black" : "#F9F5F6",
    color: lopen === index ? "#F9F5F6" : "black",
    marginBottom: "0.2rem",
    "&:hover": { backgroundColor: lopen === index ? "black" : "#F9F5F6" },
  });

  // Drawer menu items with sub-links
  const drawerItems = [
    {
      name: "Upload Regular Details",
      links: [
        { name: "PUC Details", to: "/" },
        { name: "Engg Details", to: "/EnggUpload" },
      ],
      isCollapsible: true, // This section has sub-links
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
      isCollapsible: false, // No sub-links, no collapse
    },
    {
      name: "Student Info",
      links: [{ name: "Student Info", to: "/Results" }],
      isCollapsible: false, // No sub-links, no collapse
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
    <Box sx={{ textAlign: "center" }}>
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
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        {drawerItems.map((item, index) => (
          <div key={index}>
            {/* Handle collapsible sections */}
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
                            fontWeight: selectedIndex === linkIndex ? "bold" : "normal", // Bold font for active sub-section
                          }}
                          selected={selectedIndex === linkIndex}
                          onClick={() => handleListItemClick(linkIndex)}
                        >
                          <ListItemText primary={link.name} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              // Directly handle non-collapsible sections with Link
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

  return (
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
              }}
            >
              Examination Cell
            </Typography>
            <Avatar
              alt="Logo"
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
                position: "relative",
                overflowY:"hidden", // To prevent scroll issues
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
