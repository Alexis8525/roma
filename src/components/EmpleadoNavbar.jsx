import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Notifications,
  AccountCircle,
  Home,
  Inventory2,
  LocalOffer,
  History,
  ShoppingCart,
  ExitToApp,
  Dashboard,
  PointOfSale,
  Group,
  Assessment,
  Inventory,
  AutoStories,
} from "@mui/icons-material";

const menuItems = [
  { text: "Inicio", icon: <Home />, path: "/empleado/inicio" },
  { text: "Catálogo de Productos", icon: <Inventory2 />, path: "/empleado/catalogo" },
  { text: "Ventas (POPS)", icon: <PointOfSale />, path: "/empleado/ventas" },
  { text: "Panel De Control", icon: <Dashboard />, path: "/empleado/panel" },
  { text: "Reportess", icon: <Assessment />, path: "/empleado/reportes" },
  { text: "Inventario", icon: <Inventory />, path: "/empleado/inventario" },
  { text: "Administrar Recetas", icon: <AutoStories />, path: "/empleado/recetas" },
];

const EmpleadoNavbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f1f1f1" }}>
      {/* Barra superior */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f8d7da",
          color: "black",
          boxShadow: "none",
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Board <span style={{ marginLeft: "8px" }}>Fressisimo</span>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>

            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Salir</MenuItem>
            </Menu>

            <Typography variant="body1" fontWeight="medium">
              Cliente
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar + contenido */}
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 220,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 220,
              boxSizing: "border-box",
              backgroundColor: "white",
              borderRight: "1px solid #eee",
              top: "64px",
              height: "calc(100vh - 64px)",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  sx={{ borderRadius: 2, my: 0.5 }}
                  component={Link}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItemButton>
          </Box>
        </Drawer>

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#f2edf0",
            borderRadius: "0 0 10px 10px",
            m: 2,
            p: 2,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default EmpleadoNavbar;
