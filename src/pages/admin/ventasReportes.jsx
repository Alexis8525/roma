import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KitchenIcon from '@mui/icons-material/Kitchen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// --- COLORES CLAVE ---
const PRIMARY_COLOR = '#D7385E'; // Rojo/Rosado principal
const LIGHT_PINK = '#F7E7EB'; // Fondo Rosado claro

// --- Datos de Ejemplo para la Tabla ---
const pendingOrders = [
  { id: 'ORD-1001', product: 'Harina de Trigo', quantity: 300, status: 'Pendiente' },
  { id: 'ORD-1002', product: 'Azúcar', quantity: 150, status: 'En Tránsito' },
];

/**
 * Componente que representa el Dashboard de Ventas y Reportes
 */
const SalesAnalyticsDashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* ===============================================================
            FILA SUPERIOR: GRÁFICOS (Ventas, Categorías)
            =============================================================== */}

        {/* Panel 1: Ventas Totales Hoy (Gráfico de Barras) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Ventas Totales Hoy
            </Typography>
            <Box
              sx={{
                height: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Simula el área del gráfico
                mb: 1,
              }}
            >
              {/* Aquí iría el componente de gráfico de barras */}
              [Gráfico de Barras de Ventas Simuladas]
            </Box>
            {/* Etiquetas DÍA / MENSUAL / ANUAL - Stock */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem' }}>
                <Box sx={{ mr: 2 }}>DÍA</Box>
                <Box sx={{ mr: 2 }}>MENSUAL</Box>
                <Box>ANUAL</Box>
            </Box>
          </Paper>
        </Grid>

        {/* Panel 2: Top Categorías Más Vendidas (Gráfico Circular/Dona) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Top Categorías Más Vendidas
            </Typography>
            <Box
              sx={{
                height: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Simula el área del gráfico
              }}
            >
              {/* Aquí iría el componente de gráfico circular/dona */}
              [Gráfico Circular Simulado]
            </Box>
          </Paper>
        </Grid>

        {/* ===============================================================
            FILA MEDIA: STOCKS, ACCIONES Y NOTIFICACIONES
            =============================================================== */}

        {/* Panel 3: Stock de Inventario (Gráfico) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Stock De Inventario
            </Typography>
            <Box
              sx={{
                height: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Simula el área del gráfico
              }}
            >
              [Gráfico de Barras de Stock Simuladas]
            </Box>
          </Paper>
        </Grid>

        {/* Panel 4: Acciones Rápidas (Botones) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Acciones Rápidas
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  // onClick={() => console.log('Abrir modal Agregar Usuario')}
                >
                  Agregar Nuevo Usuario (Trabajador)
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LocalOfferIcon />}
                  // onClick={() => console.log('Abrir modal Crear Promoción')}
                >
                  Crear Promoción
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<KitchenIcon />}
                  sx={{ 
                    backgroundColor: LIGHT_PINK, 
                    color: PRIMARY_COLOR, 
                    '&:hover': { backgroundColor: '#E0D0D4' },
                    fontWeight: 'bold'
                  }}
                  // onClick={() => console.log('Abrir modal Nueva Receta')}
                >
                  Nueva Receta
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Panel 5: Actividad Reciente/Notificaciones */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Actividad Reciente/Notificaciones
            </Typography>
            
            <Box sx={{ borderLeft: `3px solid ${PRIMARY_COLOR}`, pl: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Creaste Una Nueva Receta
              </Typography>
              <Typography variant="caption" color="textSecondary">
                "Fresas Con Crema Y ..."
              </Typography>
            </Box>
            
            <Box sx={{ borderLeft: `3px solid ${PRIMARY_COLOR}`, pl: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: PRIMARY_COLOR }}>
                 <NotificationsActiveIcon fontSize="small" sx={{ mr: 0.5 }} />
                 <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Alerta Del Sistema: Stock De Galleta Bajo
                 </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* ===============================================================
            FILA INFERIOR: PEDIDOS DE PROVEEDORES
            =============================================================== */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Pedidos De Proveedores Pendiente
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID ORDEN</TableCell>
                    <TableCell>PRODUCTO</TableCell>
                    <TableCell>CANTIDAD</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: order.status === 'Pendiente' ? PRIMARY_COLOR : 'green',
                            fontWeight: 'bold'
                          }}
                        >
                          {order.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SalesAnalyticsDashboard;