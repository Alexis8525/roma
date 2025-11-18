import React, { useState } from "react";
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
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import ModalReceta from "../../components/ModalAdminRecetas.jsx";

const PRIMARY_COLOR = "#D7385E";
const LIGHT_PINK = "#F7E7EB";

const initialRecetas = [
  {
    id: 1,
    nombre: "Ensalada de Frutas Fresisimo",
    tiempo: "10 min",
    dificultad: "Fácil",
    ingredientes: [
      { nombre: "Fresas frescas", cantidad: "200g" },
      { nombre: "Manzana Gala", cantidad: "1 pieza" },
    ],
    pasos: ["Lava y corta las frutas", "Coloca en un tazón", "Sirve fría"],
  },
];

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

export default function AdminRecetas() {
  const [recetas, setRecetas] = useState(initialRecetas);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(initialRecetas[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReceta, setCurrentReceta] = useState(null);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentReceta(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (receta) => {
    setIsEditing(true);
    setCurrentReceta({ ...receta });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveReceta = (data, isEdit) => {
    let parsedData = { ...data };
    try {
      if (typeof parsedData.ingredientes === "string") {
        parsedData.ingredientes = JSON.parse(parsedData.ingredientes);
      }
    } catch (err) {
      console.error("Error parsing ingredientes:", err);
    }

    setRecetas((prev) => {
      if (isEdit) {
        return prev.map((r) => (r.id === parsedData.id ? parsedData : r));
      } else {
        const newId = Math.max(...prev.map((r) => r.id)) + 1;
        const nueva = { ...parsedData, id: newId };
        return [...prev, nueva];
      }
    });

    setRecetaSeleccionada(parsedData);
    setIsModalOpen(false);
  };

  const handleDeleteReceta = (id) => {
    if (window.confirm("¿Deseas eliminar esta receta?")) {
      setRecetas((prev) => prev.filter((r) => r.id !== id));
      if (recetaSeleccionada?.id === id) setRecetaSeleccionada(null);
    }
  };

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
                  key={r.id}
                  selected={recetaSeleccionada?.id === r.id}
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
                      onClick={() => handleDeleteReceta(r.id)}
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
                    onClick={() => handleDeleteReceta(recetaSeleccionada.id)}
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
