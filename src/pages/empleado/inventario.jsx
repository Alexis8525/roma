import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Search, Inventory2, AddCircle } from "@mui/icons-material";

// --- Datos Simulados de Inventario ---
const productosInventario = [
  {
    id: 1,
    nombre: "Fresa Fresca",
    categoria: "Fruta",
    cantidad: 35,
    unidad: "kg",
    precio: 12.5,
    proveedor: "Proveedor A",
    estado: "Suficiente",
  },
  {
    id: 2,
    nombre: "Mango Ataulfo",
    categoria: "Fruta",
    cantidad: 8,
    unidad: "kg",
    precio: 15.8,
    proveedor: "Proveedor B",
    estado: "Bajo",
  },
  {
    id: 3,
    nombre: "Leche Entera",
    categoria: "Lácteos",
    cantidad: 0,
    unidad: "lt",
    precio: 18.2,
    proveedor: "Proveedor C",
    estado: "Agotado",
  },
  {
    id: 4,
    nombre: "Azúcar Morena",
    categoria: "Endulzante",
    cantidad: 22,
    unidad: "kg",
    precio: 9.5,
    proveedor: "Proveedor D",
    estado: "Suficiente",
  },
  {
    id: 5,
    nombre: "Miel Natural",
    categoria: "Endulzante",
    cantidad: 4,
    unidad: "lt",
    precio: 30.0,
    proveedor: "Proveedor D",
    estado: "Bajo",
  },
];

// --- Función para color del estado ---
const getEstadoColor = (estado) => {
  switch (estado) {
    case "Suficiente":
      return "success";
    case "Bajo":
      return "warning";
    case "Agotado":
      return "error";
    default:
      return "default";
  }
};

const InventarioProductos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState(productosInventario);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);
    const filtrados = productosInventario.filter(
      (p) =>
        p.nombre.toLowerCase().includes(valor) ||
        p.categoria.toLowerCase().includes(valor) ||
        p.proveedor.toLowerCase().includes(valor)
    );
    setProductos(filtrados);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Inventario de Productos
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Control y seguimiento de existencias actuales
      </Typography>

      {/* 🔍 Barra de búsqueda y botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Buscar por nombre, categoría o proveedor..."
          variant="outlined"
          value={busqueda}
          onChange={handleBuscar}
          size="small"
          sx={{ width: "70%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          sx={{
            backgroundColor: "#e91e63",
            "&:hover": { backgroundColor: "#c2185b" },
            borderRadius: 2,
          }}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* 📦 Tabla de productos */}
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #f9d4da",
          borderRadius: 2,
          backgroundColor: "#fffafc",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#fbe4e7" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Cantidad
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Unidad
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Precio Unitario ($)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Proveedor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Estado
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productos.map((p) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#fef2f4" },
                }}
              >
                <TableCell>{p.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Inventory2 fontSize="small" color="action" />
                    {p.nombre}
                  </Box>
                </TableCell>
                <TableCell>{p.categoria}</TableCell>
                <TableCell align="center">{p.cantidad}</TableCell>
                <TableCell align="center">{p.unidad}</TableCell>
                <TableCell align="right">${p.precio.toFixed(2)}</TableCell>
                <TableCell>{p.proveedor}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={p.estado}
                    color={getEstadoColor(p.estado)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📊 Resumen general */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Total de Productos
            </Typography>
            <Typography variant="h4" color="error.main">
              {productos.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Productos con Stock Bajo
            </Typography>
            <Typography variant="h4" color="warning.main">
              {productos.filter((p) => p.estado === "Bajo").length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Productos Agotados
            </Typography>
            <Typography variant="h4" color="error.main">
              {productos.filter((p) => p.estado === "Agotado").length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventarioProductos;
