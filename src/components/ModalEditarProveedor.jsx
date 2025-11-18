import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function ModalEditarProveedor({ open, onClose, proveedor, onGuardar }) {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (proveedor) {
      setNombre(proveedor.nombre || "");
      setContacto(proveedor.contacto || "");
      setTelefono(proveedor.telefono || "");
      setEmail(proveedor.email || "");
    }
  }, [proveedor]);

  const handleGuardar = () => {
    if (!nombre || !contacto || !telefono || !email) {
      alert("Completa todos los campos.");
      return;
    }
    onGuardar({ ...proveedor, nombre, contacto, telefono, email });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#e91e63", fontWeight: "bold" }}>
        <Edit sx={{ mr: 1, color: "#e91e63" }} />
        Editar Proveedor
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre del proveedor"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contacto"
              fullWidth
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Teléfono"
              fullWidth
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e91e63",
            "&:hover": { backgroundColor: "#c2185b" },
          }}
          onClick={handleGuardar}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
