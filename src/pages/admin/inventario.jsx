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
  Alert,
  IconButton,
  MenuItem,
  Snackbar,
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { 
  Search, 
  LocalGroceryStore, 
  AddCircle, 
  Warning,
  Edit,
  Delete,
  Refresh,
  TrendingUp,
  TrendingDown,
  Equalizer,
  CalendarToday,
  Inventory,
  AttachMoney,
  Speed,
  Close
} from "@mui/icons-material";

// Función para color del estado
const getEstadoColor = (stock, stockMinimo) => {
  if (stock === 0) return "error";
  if (stock < stockMinimo) return "warning";
  return "success";
};

const getEstadoTexto = (stock, stockMinimo) => {
  if (stock === 0) return "AGOTADO";
  if (stock < stockMinimo) return "BAJO STOCK";
  return "SUFICIENTE";
};

const API_BASE = "http://localhost:4000";

// --- MODAL PARA CREAR/EDITAR MATERIA PRIMA ---
const MateriaPrimaModal = ({ open, handleClose, onSave, materiaPrima }) => {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    unidadMedida: "",
    stock: "",
    stockMinimo: "",
    precioPromedioUnitario: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categorias = [
    "Lácteos", "Carnes", "Frutas", "Verduras", "Granos", 
    "Especias", "Bebidas", "Panadería", "Limpieza", "Otros"
  ];

  const unidadesMedida = [
    "kg", "g", "l", "ml", "pza", "lt", "bolsa", "caja", "paquete"
  ];

  useEffect(() => {
    if (materiaPrima) {
      setForm({
        nombre: materiaPrima.nombre || "",
        categoria: materiaPrima.categoria || "",
        unidadMedida: materiaPrima.unidadMedida || "",
        stock: materiaPrima.stock || "",
        stockMinimo: materiaPrima.stockMinimo || "",
        precioPromedioUnitario: materiaPrima.precioPromedioUnitario || "",
      });
    } else {
      setForm({
        nombre: "",
        categoria: "",
        unidadMedida: "",
        stock: "",
        stockMinimo: "",
        precioPromedioUnitario: "",
      });
    }
    setError("");
  }, [open, materiaPrima]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!form.nombre.trim()) throw new Error("El nombre es requerido");
      if (!form.unidadMedida) throw new Error("La unidad de medida es requerida");
      if (!form.stock || form.stock < 0) throw new Error("El stock no puede ser negativo");
      if (!form.stockMinimo || form.stockMinimo < 0) throw new Error("El stock mínimo no puede ser negativo");

      const token = localStorage.getItem("token");
      
      // RUTA CORREGIDA: usa /api/materias-primas (con guión y en plural)
      const url = materiaPrima 
        ? `${API_BASE}/api/materias-primas/${materiaPrima._id}`
        : `${API_BASE}/api/materias-primas`;
      
      const method = materiaPrima ? "PUT" : "POST";

      console.log("📤 Enviando a:", url, "Método:", method);
      console.log("📦 Datos:", form);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      console.log("📥 Respuesta status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error del servidor:", errorText);
        throw new Error(errorText || "Error al guardar la materia prima");
      }

      const data = await res.json();
      console.log("✅ Guardado exitoso:", data);

      onSave();
      handleClose();
    } catch (err) {
      console.error("💥 Error completo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {materiaPrima ? "Editar Materia Prima" : "Crear Nueva Materia Prima"}
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre *"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Categoría"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              size="small"
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Unidad de Medida *"
              name="unidadMedida"
              value={form.unidadMedida}
              onChange={handleChange}
              required
              size="small"
            >
              {unidadesMedida.map((unidad) => (
                <MenuItem key={unidad} value={unidad}>{unidad}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Stock Actual *"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              type="number"
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Stock Mínimo *"
              name="stockMinimo"
              value={form.stockMinimo}
              onChange={handleChange}
              type="number"
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Precio Unitario"
              name="precioPromedioUnitario"
              value={form.precioPromedioUnitario}
              onChange={handleChange}
              type="number"
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Guardando..." : (materiaPrima ? "Actualizar" : "Crear")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ReporteInventarioMateriaPrima = () => {
  const [busqueda, setBusqueda] = useState("");
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [periodo, setPeriodo] = useState("hoy");
  const [modalOpen, setModalOpen] = useState(false);
  const [materiaPrimaEdit, setMateriaPrimaEdit] = useState(null);

  // Cargar materias primas DESDE EL BACKEND REAL
  // Cargar materias primas DESDE EL BACKEND REAL
const cargarMateriasPrimas = async () => {
  try {
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem("token");
    console.log("🔐 Token:", token ? "Presente" : "Faltante");
    
    if (!token) {
      throw new Error("No hay token de autenticación. Inicia sesión nuevamente.");
    }

    // RUTA CORREGIDA: /api/materias-primas
    const res = await fetch(`${API_BASE}/api/materias-primas`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("📥 Status respuesta:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Token inválido o expirado. Inicia sesión nuevamente.");
      }
      if (res.status === 403) {
        throw new Error("No tienes permisos para ver las materias primas.");
      }
      if (res.status === 500) {
        throw new Error("Error interno del servidor. Intenta nuevamente.");
      }
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("✅ Materias primas cargadas:", data);
    
    setMateriasPrimas(data);
    calcularEstadisticasAvanzadas(data);
    
  } catch (err) {
    console.error('❌ Error al cargar materias primas:', err);
    setError('Error al cargar el inventario: ' + err.message);
  } finally {
    setLoading(false);
  }
};

  // Calcular estadísticas
  const calcularEstadisticasAvanzadas = (datos) => {
    const calcularStats = (data) => {
      const totalMateriasPrimas = data.length;
      const materiasPrimasBajoStock = data.filter(mp => mp.stock < mp.stockMinimo);
      const materiasPrimasAgotadas = data.filter(mp => mp.stock === 0);
      const materiasPrimasSuficientes = data.filter(mp => mp.stock >= mp.stockMinimo && mp.stock > 0);
      
      const valorTotalInventario = data.reduce((total, mp) => {
        return total + (mp.stock * (mp.precioPromedioUnitario || 0));
      }, 0);

      return {
        totalMateriasPrimas,
        materiasPrimasBajoStock: materiasPrimasBajoStock.length,
        materiasPrimasAgotadas: materiasPrimasAgotadas.length,
        materiasPrimasSuficientes: materiasPrimasSuficientes.length,
        valorTotalInventario,
        porcentajeBajoStock: totalMateriasPrimas > 0 ? Math.round((materiasPrimasBajoStock.length / totalMateriasPrimas) * 100) : 0,
        porcentajeAgotadas: totalMateriasPrimas > 0 ? Math.round((materiasPrimasAgotadas.length / totalMateriasPrimas) * 100) : 0
      };
    };

    const stats = calcularStats(datos);
    setEstadisticas({
      hoy: stats,
      semana: stats,
      mes: stats,
      año: stats
    });
  };

  const [estadisticas, setEstadisticas] = useState({
    hoy: {}, semana: {}, mes: {}, año: {}
  });

  const statsActuales = estadisticas[periodo] || estadisticas.hoy;

  // Funciones CRUD
  const handleCrear = () => {
    setMateriaPrimaEdit(null);
    setModalOpen(true);
  };

  const handleEditar = (materia) => {
    setMateriaPrimaEdit(materia);
    setModalOpen(true);
  };

  const handleEliminar = async (materia) => {
    if (window.confirm(`¿Estás seguro de eliminar "${materia.nombre}"?`)) {
      try {
        const token = localStorage.getItem("token");
        
        // RUTA CORREGIDA: /api/materias-primas
        const res = await fetch(`${API_BASE}/api/materias-primas/${materia._id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Error al eliminar");
        }
        
        mostrarSnackbar("Materia prima eliminada correctamente", "success");
        cargarMateriasPrimas();
      } catch (err) {
        console.error("❌ Error al eliminar:", err);
        mostrarSnackbar("Error al eliminar la materia prima: " + err.message, "error");
      }
    }
  };

  const handleGuardarMateriaPrima = () => {
    cargarMateriasPrimas();
    mostrarSnackbar(
      materiaPrimaEdit ? "Materia prima actualizada" : "Materia prima creada", 
      "success"
    );
  };

  const mostrarSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const materiasPrimasFiltradas = materiasPrimas.filter(mp =>
    mp.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    (mp.categoria && mp.categoria.toLowerCase().includes(busqueda.toLowerCase())) ||
    (mp.unidadMedida && mp.unidadMedida.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };

  useEffect(() => {
    cargarMateriasPrimas();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando materias primas...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
      {/* Header con botón de crear */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#2e7d32">
            📊 Inventario - Materia Prima
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Gestión completa de insumos con estadísticas
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<Refresh />}
            onClick={cargarMateriasPrimas}
            variant="outlined"
            color="success"
          >
            Actualizar
          </Button>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            sx={{ backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
            onClick={handleCrear}
          >
            Nueva Materia Prima
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filtros y búsqueda */}
      <Card sx={{ mb: 3, backgroundColor: '#f8f9fa' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Buscar por nombre, categoría o unidad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Período de reporte</InputLabel>
                <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)} label="Período de reporte">
                  <MenuItem value="hoy">Hoy</MenuItem>
                  <MenuItem value="semana">Esta semana</MenuItem>
                  <MenuItem value="mes">Este mes</MenuItem>
                  <MenuItem value="año">Este año</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Inventory fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {statsActuales.totalMateriasPrimas || 0}
              </Typography>
              <Typography>Total Materias Primas</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: '#fff8e1' }}>
            <CardContent>
              <Warning fontSize="large" color="warning.main" />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {statsActuales.materiasPrimasBajoStock || 0}
              </Typography>
              <Typography>Bajo Stock</Typography>
              <Typography variant="body2" color="warning.main">
                {statsActuales.porcentajeBajoStock || 0}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: '#ffebee' }}>
            <CardContent>
              <TrendingDown fontSize="large" color="error" />
              <Typography variant="h4" fontWeight="bold" color="error">
                {statsActuales.materiasPrimasAgotadas || 0}
              </Typography>
              <Typography>Agotadas</Typography>
              <Typography variant="body2" color="error">
                {statsActuales.porcentajeAgotadas || 0}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: '#e8f5e8' }}>
            <CardContent>
              <AttachMoney fontSize="large" color="success.main" />
              <Typography variant="h6" fontWeight="bold" color="success.main">
                {formatCurrency(statsActuales.valorTotalInventario || 0)}
              </Typography>
              <Typography>Valor Inventario</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla con acciones */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
              Lista de Materias Primas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {materiasPrimasFiltradas.length} de {materiasPrimas.length} registros
            </Typography>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e8f5e8' }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Materia Prima</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Unidad</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Stock Actual</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Stock Mínimo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">Precio Unitario</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">Valor Total</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Estado</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {materiasPrimasFiltradas.map((materia) => {
                  const valorTotal = (materia.stock || 0) * (materia.precioPromedioUnitario || 0);
                  return (
                    <TableRow key={materia._id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocalGroceryStore fontSize="small" color="action" />
                          <Typography variant="body2" fontWeight="medium">
                            {materia.nombre}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{materia.categoria || 'Sin categoría'}</TableCell>
                      <TableCell align="center">{materia.unidadMedida}</TableCell>
                      <TableCell align="center">
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          color={getEstadoColor(materia.stock, materia.stockMinimo)}
                        >
                          {materia.stock || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{materia.stockMinimo || 0}</TableCell>
                      <TableCell align="right">{formatCurrency(materia.precioPromedioUnitario)}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(valorTotal)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getEstadoTexto(materia.stock, materia.stockMinimo)}
                          color={getEstadoColor(materia.stock, materia.stockMinimo)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary" onClick={() => handleEditar(materia)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleEliminar(materia)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {materiasPrimasFiltradas.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No se encontraron materias primas
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <MateriaPrimaModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleGuardarMateriaPrima}
        materiaPrima={materiaPrimaEdit}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReporteInventarioMateriaPrima;
