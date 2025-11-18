import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";

const PRIMARY_COLOR = "#D7385E";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 600, md: 800 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function ModalReceta({
  open,
  handleClose,
  recetaData,
  isEditing,
  handleSave,
}) {
  const [formData, setFormData] = useState(
    recetaData || { nombre: "", tiempo: "", dificultad: "Fácil", ingredientes: [], pasos: [] }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleComplexChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData, isEditing);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {isEditing ? `Editar Receta: ${recetaData?.nombre}` : "Crear Nueva Receta"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre de la Receta"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Tiempo (ej: 10 min)"
              name="tiempo"
              value={formData.tiempo}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              select
              fullWidth
              label="Dificultad"
              name="dificultad"
              value={formData.dificultad}
              onChange={handleChange}
              required
              margin="normal"
              SelectProps={{ native: true }}
            >
              {["Fácil", "Media", "Difícil"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingredientes (formato JSON o texto)"
              name="ingredientes"
              multiline
              rows={4}
              value={
                Array.isArray(formData.ingredientes)
                  ? JSON.stringify(formData.ingredientes, null, 2)
                  : formData.ingredientes || ""
              }
              onChange={(e) => handleComplexChange("ingredientes", e.target.value)}
              margin="normal"
              helperText="Ejemplo: [{nombre: 'Fresa', cantidad: '100g'}]"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pasos (uno por línea)"
              name="pasos"
              multiline
              rows={6}
              value={
                Array.isArray(formData.pasos)
                  ? formData.pasos.join("\n")
                  : formData.pasos || ""
              }
              onChange={(e) => handleComplexChange("pasos", e.target.value.split("\n"))}
              margin="normal"
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            sx={{
              backgroundColor: PRIMARY_COLOR,
              "&:hover": { backgroundColor: "#C03350" },
            }}
          >
            {isEditing ? "Guardar Cambios" : "Crear Receta"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
