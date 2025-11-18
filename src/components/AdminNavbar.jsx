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
  Inventory2,
  Assessment,
  People,
  RestaurantMenu,
  LocalShipping,
  Person,
  Home,
  ExitToApp,
} from "@mui/icons-material";

const menuItems = [
  { text: "Inicio", icon: <Home />, path: "/admin/inicio" },
  { text: "Inventario", icon: <Inventory2 />, path: "/admin/inventario" },
  { text: "Ventas y Reportes", icon: <Assessment />, path: "/admin/ventas-reportes" },
  { text: "Control de Usuarios", icon: <People />, path: "/admin/control-usuarios" },
  { text: "Administrar Recetas", icon: <RestaurantMenu />, path: "/admin/recetas" },
  { text: "Proveedores y Compras", icon: <LocalShipping />, path: "/admin/proveedores" },
  { text: "Productos", icon: <Person />, path: "/admin/perfil" },
];

const AdminNavbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // ✅ Cargar usuario logueado desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      // Si no hay usuario logueado, redirigir al login
      navigate("/login");
    }
  }, [navigate]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // 🔒 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f1f1f1" }}>
      {/* Barra superior */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f8d7da",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Board <span style={{ marginLeft: "8px" }}>Fressísimo</span>
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
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    "&:hover": { backgroundColor: "#f8d7da" },
                  }}
                  component={Link}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <ListItemButton
              sx={{ borderRadius: 2 }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </Box>
        </Drawer>

        {/* Contenido principal */}
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

export default AdminNavbar;
