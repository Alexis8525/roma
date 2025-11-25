import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert
} from "@mui/material";
import { Search, Inventory2, AddCircle, Warning } from "@mui/icons-material";
import { productoService } from "../../services/productoService";

// --- Función para color del estado ---
const getEstadoColor = (stock) => {
  if (stock === 0) return "error";
  if (stock < 10) return "warning";
  return "success";
};

const getEstadoTexto = (stock) => {
  if (stock === 0) return "Agotado";
  if (stock < 10) return "Bajo";
  return "Suficiente";
};

const InventarioProductos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await productoService.getProductos();
      if (response.data) {
        setProductos(response.data);
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar el inventario: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);
  };

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda) ||
      (p.categoria && p.categoria.toLowerCase().includes(busqueda))
  );

  const productosBajoStock = productos.filter(p => p.stock < 10);
  const productosAgotados = productos.filter(p => p.stock === 0);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Inventario de Productos
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Control y seguimiento de existencias actuales
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
          placeholder="Buscar por nombre o categoría..."
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
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Stock
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Precio Venta ($)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Estado
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productosFiltrados.map((p) => (
              <TableRow
                key={p._id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#fef2f4" },
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Inventory2 fontSize="small" color="action" />
                    {p.nombre}
                  </Box>
                </TableCell>
                <TableCell>{p.categoria || 'Sin categoría'}</TableCell>
                <TableCell align="center">{p.stock || 0}</TableCell>
                <TableCell align="right">${p.precioVenta?.toFixed(2) || '0.00'}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={getEstadoTexto(p.stock)}
                    color={getEstadoColor(p.stock)}
                    variant="outlined"
                    size="small"
                    icon={p.stock < 10 ? <Warning /> : undefined}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {productosFiltrados.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron productos
          </Typography>
        </Box>
      )}

      {/* 📊 Resumen general */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Total de Productos
            </Typography>
            <Typography variant="h4" color="primary.main">
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
              {productosBajoStock.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Productos Agotados
            </Typography>
            <Typography variant="h4" color="error.main">
              {productosAgotados.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventarioProductos;
