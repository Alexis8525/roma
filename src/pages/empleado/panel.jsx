import React, { useState } from 'react';
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
    List,
    ListItemButton,
    ListItemText,
    Chip,
    Button
} from '@mui/material';
import { CreditCard, Money, ReceiptLong, CheckCircle } from '@mui/icons-material';

// --- Datos Simulados de Historial de Ventas ---
const historialVentas = [
    { 
        id: 1001, 
        fecha: '2025-10-30 14:30', 
        total: 18.27, 
        metodo: 'Efectivo', 
        estado: 'Completada',
        productos: [
            { nombre: 'Fresa Fresca 1kg', precio: 12.50, cantidad: 1 },
            { nombre: 'Manzana Gala pza', precio: 1.80, cantidad: 2 }
        ],
        subtotal: 16.10,
        iva: 2.17
    },
    { 
        id: 1002, 
        fecha: '2025-10-30 10:15', 
        total: 25.68, 
        metodo: 'Tarjeta', 
        estado: 'Completada',
        productos: [
            { nombre: 'Naranja Valencia 2kg', precio: 8.00, cantidad: 3 },
            { nombre: 'Mango Ataulfo pza', precio: 3.20, cantidad: 0.5 }
        ],
        subtotal: 22.14,
        iva: 3.54
    },
];

// --- Íconos según el método de pago ---
const getMetodoIcon = (metodo) => {
    switch (metodo) {
        case 'Efectivo':
            return <Money fontSize="small" />;
        case 'Tarjeta':
            return <CreditCard fontSize="small" />;
        default:
            return <ReceiptLong fontSize="small" />;
    }
};

const ConsultaVentas = () => {
    const [ventaSeleccionada, setVentaSeleccionada] = useState(historialVentas[0] || null);

    return (
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                Consulta de Ventas (Historial)
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={3}>
                Selecciona una venta para ver el detalle
            </Typography>

            <Grid container spacing={3}>
                {/* 🧾 Columna Izquierda: Lista de Ventas */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 1, minHeight: 500, backgroundColor: '#fdf3f5' }}>
                        <Typography variant="subtitle1" fontWeight="bold" p={1}>
                            Ventas Recientes
                        </Typography>
                        <Divider sx={{ mb: 1 }} />

                        <List disablePadding>
                            {historialVentas.map((venta) => (
                                <ListItemButton
                                    key={venta.id}
                                    selected={ventaSeleccionada && venta.id === ventaSeleccionada.id}
                                    onClick={() => setVentaSeleccionada(venta)}
                                    sx={{ 
                                        borderRadius: 1, 
                                        my: 0.5,
                                        '&.Mui-selected': {
                                            backgroundColor: '#fbe4e7',
                                            '&:hover': { backgroundColor: '#f9d4da' }
                                        }
                                    }}
                                >
                                    <ListItemText 
                                        primary={`Venta #${venta.id}`} 
                                        secondary={`Total: $${venta.total.toFixed(2)} — ${venta.fecha.split(' ')[1]}`} 
                                    />
                                    <Chip 
                                        label={venta.metodo} 
                                        size="small"
                                        icon={getMetodoIcon(venta.metodo)}
                                        sx={{ backgroundColor: '#f7c0c9', color: 'black' }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* 💳 Columna Derecha: Detalle de la Venta Seleccionada */}
                <Grid item xs={12} md={8}>
                    {ventaSeleccionada ? (
                        <Paper elevation={1} sx={{ p: 3, minHeight: 500 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    Detalle Venta #{ventaSeleccionada.id}
                                </Typography>
                                <Chip 
                                    label={ventaSeleccionada.estado} 
                                    icon={<CheckCircle />}
                                    color="success"
                                    size="medium"
                                />
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                {/* 🛒 Desglose de productos */}
                                <Grid item xs={12} lg={7}>
                                    <Typography variant="h6" mb={2}>Productos Vendidos</Typography>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table size="small">
                                            <TableHead sx={{ backgroundColor: '#fbe4e7' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cant.</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Precio U.</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ventaSeleccionada.productos.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.nombre}</TableCell>
                                                        <TableCell align="center">{item.cantidad}</TableCell>
                                                        <TableCell align="right">${item.precio.toFixed(2)}</TableCell>
                                                        <TableCell align="right">
                                                            ${(item.precio * item.cantidad).toFixed(2)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                {/* 💰 Resumen de pago */}
                                <Grid item xs={12} lg={5}>
                                    <Paper sx={{ p: 2, backgroundColor: '#fdf3f5', border: '1px solid #f9d4da' }}>
                                        <Typography variant="h6" fontWeight="bold" mb={2}>
                                            Información de Pago
                                        </Typography>

                                        <Box mb={2}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Fecha y Hora:
                                            </Typography>
                                            <Typography fontWeight="bold">{ventaSeleccionada.fecha}</Typography>
                                        </Box>

                                        <Box mb={2}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Método de Pago:
                                            </Typography>
                                            <Typography fontWeight="bold" display="flex" alignItems="center" gap={1}>
                                                {getMetodoIcon(ventaSeleccionada.metodo)} {ventaSeleccionada.metodo}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Typography variant="h6" fontWeight="bold" mb={2}>
                                            Resumen Financiero
                                        </Typography>

                                        <Box display="flex" justifyContent="space-between" mb={1}>
                                            <Typography>Subtotal:</Typography>
                                            <Typography fontWeight="bold">${ventaSeleccionada.subtotal.toFixed(2)}</Typography>
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" mb={1}>
                                            <Typography>IVA (16%):</Typography>
                                            <Typography fontWeight="bold">${ventaSeleccionada.iva.toFixed(2)}</Typography>
                                        </Box>

                                        <Divider sx={{ my: 1 }} />

                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="h6">TOTAL PAGADO:</Typography>
                                            <Typography variant="h6" fontWeight="bold" color="error.main">
                                                ${ventaSeleccionada.total.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Paper>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            mt: 3,
                                            color: '#e91e63',
                                            borderColor: '#f7c0c9',
                                            fontWeight: 'bold',
                                            '&:hover': { borderColor: '#f9d4da', backgroundColor: '#fce4ec' }
                                        }}
                                    >
                                        Imprimir Recibo
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ) : (
                        <Paper
                            elevation={1}
                            sx={{
                                p: 3,
                                minHeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h6" color="text.secondary">
                                Selecciona una venta del historial para ver su detalle.
                            </Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ConsultaVentas;
