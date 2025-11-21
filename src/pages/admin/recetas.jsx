import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Chip,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { recetaService } from "../../services/recetaService";

const PRIMARY_COLOR = "#D7385E";
const LIGHT_PINK = "#F7E7EB";

const getDificultadColor = (nivel) => {
  switch (nivel) {
    case "Fácil":
      return "success";
    case "Media":
      return "warning";
    case "Difícil":
      return "error";
    default:
      return "default";
  }
};

// Modal para crear/editar recetas
const ModalReceta = ({ open, handleClose, recetaData, isEditing, handleSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tiempo: '',
    dificultad: 'Fácil',
    ingredientes: '',
    pasos: ''
  });

  useEffect(() => {
    if (recetaData) {
      setFormData({
        nombre: recetaData.nombre || '',
        tiempo: recetaData.tiempo || '',
        dificultad: recetaData.dificultad || 'Fácil',
        ingredientes: Array.isArray(recetaData.ingredientes) 
          ? recetaData.ingredientes.map(ing => `${ing.nombre}: ${ing.cantidad}`).join('\n')
          : '',
        pasos: Array.isArray(recetaData.pasos) ? recetaData.pasos.join('\n') : ''
      });
    } else {
      setFormData({
        nombre: '',
        tiempo: '',
        dificultad: 'Fácil',
        ingredientes: '',
        pasos: ''
      });
    }
  }, [recetaData]);

  const handleSubmit = () => {
    // Parsear ingredientes
    const ingredientesArray = formData.ingredientes.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [nombre, cantidad] = line.split(':').map(part => part.trim());
        return { nombre, cantidad: cantidad || '' };
      });

    // Parsear pasos
    const pasosArray = formData.pasos.split('\n').filter(paso => paso.trim());

    const recetaCompleta = {
      ...formData,
      ingredientes: ingredientesArray,
      pasos: pasosArray,
      ...(isEditing && { id: recetaData.id })
    };

    handleSave(recetaCompleta, isEditing);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? 'Editar Receta' : 'Crear Nueva Receta'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Nombre de la Receta"
              fullWidth
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tiempo de Preparación"
              fullWidth
              value={formData.tiempo}
              onChange={(e) => setFormData({...formData, tiempo: e.target.value})}
              placeholder="Ej: 30 min"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Dificultad"
              fullWidth
              value={formData.dificultad}
              onChange={(e) => setFormData({...formData, dificultad: e.target.value})}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ingredientes"
              multiline
              rows={4}
              fullWidth
              value={formData.ingredientes}
              onChange={(e) => setFormData({...formData, ingredientes: e.target.value})}
              placeholder="Formato: Ingrediente: cantidad&#10;Ej: Harina: 200g&#10;Azúcar: 100g"
              helperText="Un ingrediente por línea, formato: Nombre: cantidad"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pasos de Preparación"
              multiline
              rows={4}
              fullWidth
              value={formData.pasos}
              onChange={(e) => setFormData({...formData, pasos: e.target.value})}
              placeholder="Un paso por línea"
              helperText="Un paso por línea"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function AdminRecetas() {
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReceta, setCurrentReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = async () => {
    try {
      setLoading(true);
      const response = await recetaService.getRecetas();
      setRecetas(response.data || []);
      if (response.data && response.data.length > 0) {
        setRecetaSeleccionada(response.data[0]);
      }
    } catch (err) {
      console.error('Error al cargar recetas:', err);
      setError('Error al cargar las recetas. Usando datos de ejemplo.');
      // Datos de ejemplo como fallback
      setRecetas([
        {
          _id: '1',
          nombre: "Ensalada de Frutas Fresisimo",
          tiempo: "10 min",
          dificultad: "Fácil",
          ingredientes: [
            { nombre: "Fresas frescas", cantidad: "200g" },
            { nombre: "Manzana Gala", cantidad: "1 pieza" },
          ],
          pasos: ["Lava y corta las frutas", "Coloca en un tazón", "Sirve fría"],
        }
      ]);
      setRecetaSeleccionada({
        _id: '1',
        nombre: "Ensalada de Frutas Fresisimo",
        tiempo: "10 min",
        dificultad: "Fácil",
        ingredientes: [
          { nombre: "Fresas frescas", cantidad: "200g" },
          { nombre: "Manzana Gala", cantidad: "1 pieza" },
        ],
        pasos: ["Lava y corta las frutas", "Coloca en un tazón", "Sirve fría"],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentReceta(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (receta) => {
    setIsEditing(true);
    setCurrentReceta(receta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveReceta = async (data, isEdit) => {
    try {
      if (isEdit) {
        // Actualizar receta existente
        await recetaService.updateReceta(data._id, data);
      } else {
        // Crear nueva receta
        await recetaService.createReceta(data);
      }
      await cargarRecetas();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al guardar receta:', err);
      alert('Error al guardar la receta: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteReceta = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
      try {
        await recetaService.deleteReceta(id);
        await cargarRecetas();
        if (recetaSeleccionada?._id === id) {
          setRecetaSeleccionada(null);
        }
      } catch (err) {
        console.error('Error al eliminar receta:', err);
        alert('Error al eliminar la receta: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: LIGHT_PINK, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Administración de Recetas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: PRIMARY_COLOR,
            "&:hover": { backgroundColor: "#C03350" },
          }}
        >
          Crear Nueva Receta
        </Button>
      </Box>

      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 1, minHeight: 500 }}>
            <Typography variant="subtitle1" fontWeight="bold" p={1}>
              Recetas Disponibles ({recetas.length})
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <List disablePadding>
              {recetas.map((r) => (
                <ListItemButton
                  key={r._id}
                  selected={recetaSeleccionada?._id === r._id}
                  onClick={() => setRecetaSeleccionada(r)}
                >
                  <ListItemText primary={r.nombre} />
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton size="small" onClick={() => handleOpenEdit(r)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteReceta(r._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {recetaSeleccionada ? (
            <Paper elevation={1} sx={{ p: 3, minHeight: 500 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {recetaSeleccionada.nombre}
                </Typography>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip
                    label={recetaSeleccionada.dificultad}
                    color={getDificultadColor(recetaSeleccionada.dificultad)}
                    icon={<CheckCircleIcon />}
                  />
                  <IconButton onClick={() => handleOpenEdit(recetaSeleccionada)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteReceta(recetaSeleccionada._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h6" mb={2}>
                    Ingredientes
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: LIGHT_PINK }}>
                        <TableRow>
                          <TableCell>Ingrediente</TableCell>
                          <TableCell align="right">Cantidad</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(recetaSeleccionada.ingredientes) &&
                          recetaSeleccionada.ingredientes.map((ing, i) => (
                            <TableRow key={i}>
                              <TableCell>{ing.nombre}</TableCell>
                              <TableCell align="right">{ing.cantidad}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Typography variant="h6" mb={2}>
                    Pasos a Seguir
                  </Typography>
                  {Array.isArray(recetaSeleccionada.pasos) &&
                    recetaSeleccionada.pasos.map((paso, i) => (
                      <Box key={i} display="flex" mb={1.5}>
                        <Chip
                          label={i + 1}
                          size="small"
                          sx={{
                            backgroundColor: PRIMARY_COLOR,
                            color: "white",
                            mr: 1.5,
                          }}
                        />
                        <Typography>{paso}</Typography>
                      </Box>
                    ))}
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Tiempo total: ${recetaSeleccionada.tiempo}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, minHeight: 500, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Selecciona una receta o crea una nueva.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      <ModalReceta
        open={isModalOpen}
        handleClose={handleCloseModal}
        recetaData={currentReceta}
        isEditing={isEditing}
        handleSave={handleSaveReceta}
      />
    </Box>
  );
}
