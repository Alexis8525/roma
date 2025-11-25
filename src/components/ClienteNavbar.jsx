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
  Badge,
} from "@mui/material";
import {
  Notifications,
  AccountCircle,
  Home,
  Inventory2,
  History,
  ShoppingCart,
  ExitToApp,
  LocalCafe,
  MenuBook,
} from "@mui/icons-material";

const menuItems = [
  { text: "Inicio", icon: <Home />, path: "/" },
  { text: "Menú RoMa", icon: <MenuBook />, path: "/catalogo" },
  { text: "Mis Pedidos", icon: <History />, path: "/historial" },
  { text: "Mi Carrito", icon: <ShoppingCart />, path: "/carrito" },
];

const ClienteNavbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [carritoCount, setCarritoCount] = useState(0);
  const navigate = useNavigate();

  // Cargar usuario y carrito
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Contar items en carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarritoCount(carrito.length);
  }, [navigate]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#fafafa" }}>
      {/* AppBar - Tema café elegante */}
      <AppBar
        position="static"
        sx={{ 
          backgroundColor: "#5D4037", // Café oscuro elegante
          color: "white", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)" 
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalCafe sx={{ fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold">
              RoMa Café
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>
              Cliente
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Icono de carrito con badge */}
            <IconButton 
              color="inherit" 
              component={Link} 
              to="/carrito"
              sx={{ position: 'relative' }}
            >
              <Badge 
                badgeContent={carritoCount} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#D7CCC8',
                    color: '#5D4037',
                    fontWeight: 'bold'
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

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
              PaperProps={{
                sx: {
                  mt: 1.5,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                  }
                }
              }}
            >
              <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Mis Favoritos</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>

            {usuario && (
              <Typography variant="body1" fontWeight="medium">
                Hola, {usuario.nombre.split(' ')[0]}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Layout principal */}
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#FFF8F0", // Fondo crema claro
              borderRight: "1px solid #E8D6CB",
              top: "64px",
              height: "calc(100vh - 64px)",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography 
              variant="subtitle2" 
              color="#5D4037" 
              fontWeight="bold" 
              sx={{ mb: 2, px: 1 }}
            >
              MI EXPERIENCIA RO MA
            </Typography>
            
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    "&:hover": { 
                      backgroundColor: "#F3E5D8",
                      color: "#5D4037"
                    },
                  }}
                  component={Link}
                  to={item.path}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
                  />
                </ListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 2, borderColor: '#E8D6CB' }} />

            <ListItemButton 
              sx={{ 
                borderRadius: 2,
                "&:hover": { 
                  backgroundColor: "#FFEBEE",
                  color: "#D32F2F"
                }
              }} 
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText 
                primary="Cerrar sesión" 
                primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
              />
            </ListItemButton>

            {/* Información de contacto */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#F3E5D8', borderRadius: 2 }}>
              <Typography variant="caption" color="#5D4037" fontWeight="medium">
                📍 Puebla 62A, Dolores Hidalgo
              </Typography>
              <Typography variant="caption" color="#5D4037" sx={{ display: 'block', mt: 0.5 }}>
                ☕ Tu pausa favorita
              </Typography>
            </Box>
          </Box>
        </Drawer>

        {/* Contenido principal */}
        <Box
          sx={{ 
            flexGrow: 1, 
            backgroundColor: "#fafafa", 
            m: 2, 
            p: 3, 
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ClienteNavbar;
