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
import { Search, Inventory2, AddCircle, Edit, Delete } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const getEstado = (stock, stockMinimo) => {
  if (stock <= 0) return "Agotado";
  if (stock <= stockMinimo) return "Bajo";
  return "Suficiente";
};

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

const COLORS = ["#66bb6a", "#ffca28", "#ef5350"];

const InventarioProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    _id: null,
    nombre: "",
    categoria: "",
    unidadMedida: "",
    stock: "",
    stockMinimo: "",
    proveedores: "",
    precioPromedioUnitario: "",
  });

  // Categorías fijas (no vienen de base)
  const categorias = ["Materia Prima", "Limpieza", "Herramientas", "Papelería", "Otros"];

  // Cargar productos desde la API
const fetchProductos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/materias-primas`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();

    // Verificar que sea un arreglo
    if (Array.isArray(data)) {
      setProductos(data);
    } else if (data && Array.isArray(data.data)) {
      setProductos(data.data); // algunos backends devuelven { data: [...] }
    } else {
      console.warn("La respuesta no es un arreglo:", data);
      setProductos([]);
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
    setProductos([]);
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  // Guardar o actualizar producto
  const handleSave = async () => {
    try {
      const method = editando ? "PUT" : "POST";
      const url = editando
        ? `${API_BASE_URL}/api/materias-primas/${form._id}`
        : `${API_BASE_URL}/api/materias-primas`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar producto.");
      setOpenModal(false);
      setEditando(false);
      fetchProductos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto.");
    }
  };

  // Editar
  const handleEdit = (producto) => {
    setForm(producto);
    setEditando(true);
    setOpenModal(true);
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/materias-primas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Filtro de búsqueda
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Datos para resumen y gráfica
  const total = productos.length;
  const bajos = productos.filter((p) => p.stock > 0 && p.stock <= p.stockMinimo).length;
  const agotados = productos.filter((p) => p.stock <= 0).length;
  const suficientes = total - bajos - agotados;

  const dataGrafica = [
    { name: "Suficientes", value: suficientes },
    { name: "Stock Bajo", value: bajos },
    { name: "Agotados", value: agotados },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Inventario de Productos
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Control y seguimiento de existencias actuales
      </Typography>

      {/* 🔍 Búsqueda */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
          onClick={() => {
            setForm({
              nombre: "",
              categoria: "",
              unidadMedida: "",
              stock: "",
              stockMinimo: "",
              proveedores: "",
              precioPromedioUnitario: "",
            });
            setEditando(false);
            setOpenModal(true);
          }}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* 📦 Tabla */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#fbe4e7" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Mínimo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unidad</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Proveedor</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Precio Unitario ($)</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productosFiltrados.map((p) => {
              const estado = getEstado(p.stock, p.stockMinimo);
              return (
                <TableRow key={p._id} hover>
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
                  <TableCell>{p.proveedores?.[0]?.nombre || "—"}</TableCell>
                  <TableCell align="right">
                    ${p.precioPromedioUnitario?.toFixed(2) || "0.00"}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={estado}
                      color={getEstadoColor(estado)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(p._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📊 Resumen */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">Total de Productos</Typography>
            <Typography variant="h4" color="error.main">{total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">Productos con Stock Bajo</Typography>
            <Typography variant="h4" color="warning.main">{bajos}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fdf3f5" }}>
            <Typography variant="h6" fontWeight="bold">Productos Agotados</Typography>
            <Typography variant="h4" color="error.main">{agotados}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 📈 Gráfica */}
      <Box sx={{ height: 300, mt: 4 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={dataGrafica} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {dataGrafica.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* 🧾 Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editando ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" fullWidth margin="dense" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Categoría</InputLabel>
            <Select value={form.categoria} label="Categoría" onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              {categorias.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Unidad de Medida" fullWidth margin="dense" value={form.unidadMedida} onChange={(e) => setForm({ ...form, unidadMedida: e.target.value })} />
          <TextField label="Stock" type="number" fullWidth margin="dense" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <TextField label="Stock Mínimo" type="number" fullWidth margin="dense" value={form.stockMinimo} onChange={(e) => setForm({ ...form, stockMinimo: e.target.value })} />
          <TextField label="Proveedor" fullWidth margin="dense" value={form.proveedores} onChange={(e) => setForm({ ...form, proveedores: e.target.value })} />
          <TextField label="Precio Promedio Unitario ($)" type="number" fullWidth margin="dense" value={form.precioPromedioUnitario} onChange={(e) => setForm({ ...form, precioPromedioUnitario: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" sx={{ backgroundColor: "#D7385E" }} onClick={handleSave}>
            {editando ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventarioProductos;
