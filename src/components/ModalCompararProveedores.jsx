import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ModalCompararProveedores({ open, onClose, comparacion }) {
  if (!comparacion || comparacion.length === 0) return null;

  const proveedorA = comparacion[0].proveedorA;
  const proveedorB = comparacion[0].proveedorB;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: "#f9fafb",
        },
      }}
    >
      {/* --- Título con botón de cierre --- */}
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <DialogTitle sx={{ p: 0, fontWeight: "bold", color: "#2e7d32" }}>
          Comparación entre {proveedorA} y {proveedorB}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        {comparacion.map((item, i) => (
          <Card
            key={i}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.01)" },
            }}
          >
            <CardContent>
              {/* --- Nombre del producto --- */}
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                {item.nombre}
              </Typography>

              <Grid container spacing={2}>
                {/* --- Proveedor A --- */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#e8f5e9",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ color: "#1b5e20", mb: 1 }}
                    >
                      {item.proveedorA}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <MonetizationOnIcon sx={{ mr: 1, color: "#388e3c" }} /> Precio: ${item.precioA}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon sx={{ mr: 1, color: "#558b2f" }} /> Entrega: {item.tiempoA} días
                    </Typography>
                  </Box>
                </Grid>

                {/* --- Proveedor B --- */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#e3f2fd",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ color: "#0d47a1", mb: 1 }}
                    >
                      {item.proveedorB}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <MonetizationOnIcon sx={{ mr: 1, color: "#1976d2" }} /> Precio: ${item.precioB}
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon sx={{ mr: 1, color: "#1565c0" }} /> Entrega: {item.tiempoB} días
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* --- Mejor opción --- */}
              <Box display="flex" alignItems="center" gap={1}>
                <EmojiEventsIcon sx={{ color: "#fbc02d" }} />
                <Typography variant="body1" fontWeight="bold">
                  Mejor opción:
                </Typography>
                <Chip
                  label={item.mejor}
                  color={item.mejor === item.proveedorA ? "success" : "primary"}
                  variant="filled"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
}
