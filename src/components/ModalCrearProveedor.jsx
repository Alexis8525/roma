import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function ModalCrearProveedor({
  open,
  onClose,
  onGuardar,
  onEliminar,
  proveedorEditado,
}) {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  // --- Cargar datos si se está editando ---
  useEffect(() => {
    if (proveedorEditado) {
      setNombre(proveedorEditado.nombre);
      setContacto(proveedorEditado.contacto || "");
      setTelefono(proveedorEditado.telefono || "");
      setEmail(proveedorEditado.email || "");
      setProductos(proveedorEditado.productos || []);
    } else {
      setNombre("");
      setContacto("");
      setTelefono("");
      setEmail("");
      setProductos([]);
    }
  }, [proveedorEditado]);

  const handleGuardar = () => {
    if (!nombre || !contacto || !telefono || !email) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const proveedor = {
      id: proveedorEditado ? proveedorEditado.id : Date.now(),
      nombre,
      contacto,
      telefono,
      email,
      productos,
    };

    onGuardar(proveedor);
    handleCerrar();
  };

  const handleCerrar = () => {
    onClose();
    setNombre("");
    setContacto("");
    setTelefono("");
    setEmail("");
    setProductos([]);
    setNuevoProducto("");
  };

  const handleAgregarProducto = () => {
    if (nuevoProducto.trim() === "") return;
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto("");
  };

  const handleEliminarProducto = (prod) => {
    setProductos(productos.filter((p) => p !== prod));
  };

  const handleEliminarProveedor = () => {
    if (proveedorEditado && window.confirm("¿Eliminar este proveedor?")) {
      onEliminar(proveedorEditado.id);
      handleCerrar();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCerrar}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: "#fff0f5", // 💗 Fondo rosa pastel
        },
      }}
    >
      {/* --- Título con botón de cierre --- */}
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <DialogTitle
          sx={{
            p: 0,
            fontWeight: "bold",
            color: "#ad1457", // Rosa fuerte
          }}
        >
          {proveedorEditado ? (
            <>
              <EditIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Editar Proveedor
            </>
          ) : (
            <>
              🆕 Registrar Nuevo Proveedor
            </>
          )}
        </DialogTitle>
        <IconButton onClick={handleCerrar}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* --- Contenido --- */}
      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* --- Nombre del proveedor --- */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <BusinessIcon sx={{ mr: 1, color: "#d81b60" }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Datos del Proveedor
              </Typography>
            </Box>
            <TextField
              label="Nombre del proveedor"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>

          {/* --- Nombre del contacto --- */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <PersonIcon sx={{ mr: 1, color: "#c2185b" }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Contacto Principal
              </Typography>
            </Box>
            <TextField
              label="Nombre del contacto"
              fullWidth
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>

          {/* --- Teléfono y Email --- */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <PhoneIcon sx={{ mr: 1, color: "#ec407a" }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Teléfono
              </Typography>
            </Box>
            <TextField
              label="Teléfono"
              fullWidth
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <EmailIcon sx={{ mr: 1, color: "#ad1457" }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Correo electrónico
              </Typography>
            </Box>
            <TextField
              label="Correo electrónico"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>

          {/* --- Productos del proveedor --- */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#880e4f", mb: 1 }}
            >
              🛍️ Productos que ofrece
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Agregar producto"
                fullWidth
                value={nuevoProducto}
                onChange={(e) => setNuevoProducto(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <IconButton
                color="secondary"
                onClick={handleAgregarProducto}
                sx={{ color: "#ad1457" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>

            <Paper
              elevation={1}
              sx={{
                mt: 2,
                maxHeight: 150,
                overflowY: "auto",
                borderRadius: 2,
                backgroundColor: "white",
              }}
            >
              <List dense>
                {productos.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center", p: 1 }}
                  >
                    No se han agregado productos aún.
                  </Typography>
                ) : (
                  productos.map((prod, i) => (
                    <ListItem
                      key={i}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleEliminarProducto(prod)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={prod} />
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      {/* --- Botones de acción --- */}
      <DialogActions sx={{ p: 2 }}>
        {proveedorEditado && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleEliminarProveedor}
          >
            Eliminar
          </Button>
        )}
        <Button onClick={handleCerrar} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d81b60",
            "&:hover": { backgroundColor: "#ad1457" },
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={handleGuardar}
        >
          {proveedorEditado ? "Guardar Cambios" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
