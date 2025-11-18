import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ModalOrdenCompra({ open, onClose, proveedores = [] }) {
  const [proveedorId, setProveedorId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");

  const proveedorSeleccionado =
    proveedores?.find((p) => p.id === parseInt(proveedorId)) || null;

  const productoSeleccionado =
    proveedorSeleccionado?.productos?.find(
      (prod) => prod.id_producto === parseInt(productoId)
    ) || null;

  const precioUnitario = productoSeleccionado?.precio || 0;
  const total = cantidad && precioUnitario ? cantidad * precioUnitario : 0;

  const handleGenerarOrden = () => {
    if (!proveedorId || !productoId || !cantidad) {
      alert("Por favor completa todos los campos de la orden.");
      return;
    }

    const orden = {
      id: Date.now(),
      proveedor: proveedorSeleccionado?.nombre,
      producto: productoSeleccionado?.nombre,
      cantidad: Number(cantidad),
      precioUnitario: Number(precioUnitario),
      total,
      fecha: new Date().toLocaleDateString(),
    };

    // --- Generar PDF ---
    const doc = new jsPDF();
    doc.text("ORDEN DE COMPRA", 14, 20);
    doc.text(`Proveedor: ${orden.proveedor}`, 14, 30);
    doc.text(`Fecha: ${orden.fecha}`, 14, 40);

    doc.autoTable({
      startY: 50,
      head: [["Producto", "Cantidad", "Precio Unitario", "Total"]],
      body: [
        [
          orden.producto,
          orden.cantidad,
          `$${orden.precioUnitario}`,
          `$${orden.total.toFixed(2)}`,
        ],
      ],
    });

    doc.text(`TOTAL A PAGAR: $${orden.total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);
    doc.save(`Orden_${orden.proveedor}_${orden.id}.pdf`);

    alert(`✅ Orden de compra generada para ${orden.proveedor}`);
    onClose();

    setProveedorId("");
    setProductoId("");
    setCantidad("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🧾 Generar Orden de Compra</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              select
              label="Proveedor"
              fullWidth
              value={proveedorId}
              onChange={(e) => {
                setProveedorId(e.target.value);
                setProductoId("");
              }}
            >
              {(proveedores || []).map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {proveedorSeleccionado && (
            <Grid item xs={12}>
              <TextField
                select
                label="Producto"
                fullWidth
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
              >
                {proveedorSeleccionado.productos.map((prod) => (
                  <MenuItem key={prod.id_producto} value={prod.id_producto}>
                    {prod.nombre} — ${prod.precio}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid item xs={6}>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Precio Unitario ($)"
              type="number"
              fullWidth
              value={precioUnitario}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" align="right">
              Total: ${total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerarOrden}
        >
          Generar Orden
        </Button>
      </DialogActions>
    </Dialog>
  );
}
