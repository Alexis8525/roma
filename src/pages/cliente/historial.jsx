import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Card, 
  CardContent, 
  Modal 
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

// --- Datos Simulados de Pedidos ---
const pedidosSimulados = [
  { id: '1001', fecha: '25/10/2025', total: 45.50, estado: 'Entregado', color: 'success.main' },
  { id: '1002', fecha: '20/10/2025', total: 60.75, estado: 'En Proceso', color: 'warning.main' },
  { id: '1003', fecha: '15/10/2025', total: 22.00, estado: 'Cancelado', color: 'error.main' },
  { id: '1004', fecha: '01/10/2025', total: 98.90, estado: 'Entregado', color: 'success.main' },
  { id: '1005', fecha: '28/09/2025', total: 35.10, estado: 'Entregado', color: 'success.main' },
  { id: '1006', fecha: '12/09/2025', total: 15.99, estado: 'En Proceso', color: 'warning.main' },
  { id: '1007', fecha: '05/09/2025', total: 70.00, estado: 'Entregado', color: 'success.main' },
  { id: '1008', fecha: '29/08/2025', total: 88.40, estado: 'Entregado', color: 'success.main' },
];

// --- Estilos del modal ---
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600, md: 700 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

// --- Modal interno ---
const DetallePedidoModal = ({ open, handleClose, pedido }) => {
  if (!pedido) return null;

  const detalleSimulado = {
    productos: [
      { nombre: 'Fresa Fresca 1kg', cantidad: 2, precio: 12.50 },
      { nombre: 'Manzana Verde', cantidad: 5, precio: 1.80 },
      { nombre: 'Naranja Valencia 2kg', cantidad: 1, precio: 8.00 },
    ],
    direccion: 'Calle Falsa 123, Col. Centro, Ciudad de México, CP 06000',
    metodoPago: 'Tarjeta de Crédito (**** 1234)',
    subtotal: 35.50,
    envio: 10.00,
  };

  const estadoColor = pedido.estado === 'Entregado' ? 'success.main' : 
                      pedido.estado === 'En Proceso' ? 'warning.main' : 'error.main';

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Detalles del Pedido #{pedido.id}
          </Typography>
          <Button onClick={handleClose} sx={{ color: 'black' }}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {/* Info general */}
        <Box mb={3} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary">Fecha de Pedido</Typography>
            <Typography variant="body1" fontWeight="medium">{pedido.fecha}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">Estado</Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ color: estadoColor }}>
              {pedido.estado}
            </Typography>
          </Box>
        </Box>

        {/* Productos */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Productos</Typography>
        <List disablePadding sx={{ border: '1px solid #eee', borderRadius: 1, mb: 3 }}>
          {detalleSimulado.productos.map((item, index) => (
            <ListItem key={index} sx={{ borderBottom: index < detalleSimulado.productos.length - 1 ? '1px solid #eee' : 'none' }}>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{item.nombre}</Typography>
                    <Typography fontWeight="medium">${(item.precio * item.cantidad).toFixed(2)}</Typography>
                  </Box>
                }
                secondary={`Cantidad: ${item.cantidad} x $${item.precio.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>

        {/* Resumen */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Resumen</Typography>
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1">${detalleSimulado.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="body1">Envío:</Typography>
            <Typography variant="body1">${detalleSimulado.envio.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold">Total:</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'error.main' }}>
              ${(detalleSimulado.subtotal + detalleSimulado.envio).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Dirección y pago */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Entrega y Pago</Typography>
        <Typography variant="body2" color="text.secondary">Dirección:</Typography>
        <Typography variant="body1" fontWeight="medium" mb={1}>{detalleSimulado.direccion}</Typography>
        <Typography variant="body2" color="text.secondary">Método de Pago:</Typography>
        <Typography variant="body1" fontWeight="medium">{detalleSimulado.metodoPago}</Typography>

        {/* Botones */}
        <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
          <Button variant="outlined" sx={{ color: 'black', borderColor: '#fbe4e7', '&:hover': { backgroundColor: '#f9d4da' } }}>
            Reordenar
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#fbe4e7', color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#f9d4da' } }}>
            Imprimir Factura
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- Ítem de pedido ---
const PedidoItem = ({ id, fecha, total, estado, color, onOpenDetails }) => (
  <ListItem
    sx={{
      borderBottom: '1px solid #eee',
      py: 1.5,
      '&:hover': { backgroundColor: '#f9f9f9', cursor: 'pointer' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <ListItemText
      sx={{ flexGrow: 1, mr: 2 }}
      primary={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="bold">Pedido #{id}</Typography>
          <Typography variant="caption" sx={{ color, fontWeight: 'bold', border: `1px solid ${color}`, borderRadius: 1, px: 1, py: 0.2 }}>
            {estado}
          </Typography>
        </Box>
      }
      secondary={
        <Box display="flex" justifyContent="space-between" mt={0.5}>
          <Typography variant="body2" color="text.secondary">Fecha: {fecha}</Typography>
          <Typography variant="body1" fontWeight="medium">Total: ${total.toFixed(2)}</Typography>
        </Box>
      }
    />

    <Box display="flex" alignItems="center" sx={{ flexShrink: 0 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => onOpenDetails(id)}
        sx={{
          mr: 1,
          borderColor: '#fbe4e7',
          color: 'black',
          '&:hover': {
            backgroundColor: '#f9d4da',
            borderColor: '#fbe4e7',
          },
        }}
      >
        Ver Detalles
      </Button>
      <ChevronRight />
    </Box>
  </ListItem>
);

// --- Componente principal ---
const HistorialPedidos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleOpenDetails = (id) => {
    const pedido = pedidosSimulados.find((p) => p.id === id);
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card sx={{ width: '100%', flexGrow: 1, boxShadow: 3, p: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 0, "&:last-child": { pb: 0 } }}>
        {/* Encabezado */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Historial de Pedidos
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Box>

        {/* Lista de pedidos */}
        {pedidosSimulados.length > 0 ? (
          <Box sx={{ overflowY: 'auto', flexGrow: 1, px: 2, pb: 2 }}>
            <List sx={{ p: 0 }}>
              {pedidosSimulados.map((pedido) => (
                <PedidoItem key={pedido.id} {...pedido} onOpenDetails={handleOpenDetails} />
              ))}
            </List>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
            <Typography variant="h6" color="text.secondary">
              Aún no tienes pedidos registrados.
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Modal de detalles */}
      <DetallePedidoModal open={openModal} handleClose={handleCloseModal} pedido={selectedPedido} />
    </Card>
  );
};

export default HistorialPedidos;
