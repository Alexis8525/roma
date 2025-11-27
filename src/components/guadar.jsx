import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, Inventory2, AddCircle } from "@mui/icons-material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

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
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    unidadMedida: "",
    stock: "",
    stockMinimo: "",
  });
  const [categorias, setCategorias] = useState([]);

  // --- Cargar datos desde la API ---
  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/materiasprimas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setProductos(data);
      setCategorias([...new Set(data.map((p) => p.categoria))]);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // --- Guardar producto nuevo o editado ---
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/materiasprimas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar el producto.");
      setOpenModal(false);
      setForm({ nombre: "", categoria: "", unidadMedida: "", stock: "", stockMinimo: "" });
      fetchProductos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto.");
    }
  };

  // --- Filtro de búsqueda ---
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Inventario de Productos
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Control y seguimiento de existencias actuales
      </Typography>

      {/* 🔍 Búsqueda + botón */}
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
          onChange={(e) => setBusqueda(e.target.value)}
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
          onClick={() => setOpenModal(true)}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* 📦 Tabla */}
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
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Mínimo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unidad</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Estado
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productosFiltrados.map((p) => {
              let estado = "Suficiente";
              if (p.stock <= 0) estado = "Agotado";
              else if (p.stock <= p.stockMinimo) estado = "Bajo";

              return (
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
                  <TableCell>{p.categoria}</TableCell>
                  <TableCell align="center">{p.stock}</TableCell>
                  <TableCell align="center">{p.stockMinimo}</TableCell>
                  <TableCell>{p.unidadMedida}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={estado}
                      color={getEstadoColor(estado)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
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
              {productos.filter((p) => p.stock > 0 && p.stock <= p.stockMinimo).length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Productos Agotados
            </Typography>
            <Typography variant="h4" color="error.main">
              {productos.filter((p) => p.stock <= 0).length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 🧾 Modal Nuevo Producto */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nuevo Producto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="dense"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={form.categoria}
              label="Categoría"
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              {categorias.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Unidad de Medida"
            fullWidth
            margin="dense"
            value={form.unidadMedida}
            onChange={(e) => setForm({ ...form, unidadMedida: e.target.value })}
          />

          <TextField
            label="Stock"
            type="number"
            fullWidth
            margin="dense"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <TextField
            label="Stock Mínimo"
            type="number"
            fullWidth
            margin="dense"
            value={form.stockMinimo}
            onChange={(e) => setForm({ ...form, stockMinimo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" sx={{ backgroundColor: "#D7385E" }} onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventarioProductos;
