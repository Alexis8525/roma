import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Dashboard,
  Inventory2,
  Assessment,
  Inventory,
  PointOfSale,
  AutoStories,
  ExitToApp,
  Home,
} from "@mui/icons-material";

const menuItems = [
  { text: "Inicio", icon: <Home />, path: "/empleado/inicio" },
  { text: "Catálogo de Productos", icon: <Inventory2 />, path: "/empleado/catalogo" },
  { text: "Ventas", icon: <PointOfSale />, path: "/empleado/ventas" },
  { text: "Panel", icon: <Dashboard />, path: "/empleado/panel" },
  { text: "Reportes", icon: <Assessment />, path: "/empleado/reportes" },
  { text: "Inventario", icon: <Inventory />, path: "/empleado/inventario" },
  { text: "Recetas", icon: <AutoStories />, path: "/empleado/recetas" },
];

const EmpleadoNavbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f1f1f1" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f8d7da", color: "black", boxShadow: "none" }}
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

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>

            {usuario && (
              <Typography variant="body1" fontWeight="medium">
                {usuario.nombre}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 220,
            [`& .MuiDrawer-paper`]: {
              width: 220,
              boxSizing: "border-box",
              top: "64px",
              height: "calc(100vh - 64px)",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton key={item.text} component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <ListItemButton sx={{ borderRadius: 2 }} onClick={handleLogout}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </Box>
        </Drawer>

        <Box
          sx={{ flexGrow: 1, backgroundColor: "#f2edf0", m: 2, p: 2, overflowY: "auto" }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default EmpleadoNavbar;
