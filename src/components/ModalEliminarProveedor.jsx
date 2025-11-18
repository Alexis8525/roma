import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";

export default function ModalEliminarProveedor({ open, onClose, onConfirmar, proveedor }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>
        <WarningAmber sx={{ mr: 1, color: "#d32f2f" }} />
        Confirmar Eliminación
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center" p={2}>
          <Typography variant="body1" mb={2}>
            ¿Seguro que deseas eliminar al proveedor{" "}
            <strong>{proveedor?.nombre}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta acción no se puede deshacer.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
          onClick={() => {
            onConfirmar(proveedor.id);
            onClose();
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
