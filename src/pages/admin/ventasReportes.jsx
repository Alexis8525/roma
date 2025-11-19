import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KitchenIcon from '@mui/icons-material/Kitchen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ventaService } from '../../services/ventaService';
import { inventarioService } from '../../services/inventarioService';
import { compraService } from '../../services/compraService';
import { alertaService } from '../../services/alertaService';

const PRIMARY_COLOR = '#D7385E';
const LIGHT_PINK = '#F7E7EB';

const SalesAnalyticsDashboard = () => {
  const [ventasHoy, setVentasHoy] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatosDashboard();
  }, []);

  const cargarDatosDashboard = async () => {
    try {
      setLoading(true);
      
      // Cargar ventas
      const ventasResponse = await ventaService.getVentas();
      const ventasData = ventasResponse.data;
      
      // Calcular ventas de hoy
      const hoy = new Date().toDateString();
      const ventasHoyData = ventasData.filter(venta => {
        const fechaVenta = new Date(venta.fecha).toDateString();
        return fechaVenta === hoy;
      });
      
      const totalHoy = ventasHoyData.reduce((sum, venta) => sum + venta.total, 0);
      const totalGeneral = ventasData.reduce((sum, venta) => sum + venta.total, 0);
      
      setVentasHoy(totalHoy);
      setTotalVentas(totalGeneral);

      // Cargar inventario
      const inventarioResponse = await inventarioService.getInventario();
      setStockData(inventarioResponse.data.slice(0, 5));

      // Cargar compras pendientes
      const comprasResponse = await compraService.getCompras();
      const pendientes = comprasResponse.data.filter(compra => compra.estado === 'pendiente');
      setPedidosPendientes(pendientes.slice(0, 3));

      // Cargar alertas
      const alertasResponse = await alertaService.getAlertas();
      setAlertas(alertasResponse.data.slice(0, 3));

    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para simular top categorías (ya que no tienes ese endpoint)
  const topCategorias = [
    { categoria: 'Panadería', ventas: 45 },
    { categoria: 'Pastelería', ventas: 32 },
    { categoria: 'Bebidas', ventas: 28 }
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Grid container spacing={3}>
        {/* Ventas Totales Hoy */}
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
                backgroundColor: '#f5f5f5',
                mb: 1,
                flexDirection: 'column'
              }}
            >
              <Typography variant="h3" fontWeight="bold" color={PRIMARY_COLOR}>
                ${ventasHoy.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total vendido hoy
              </Typography>
              <Divider sx={{ my: 2, width: '80%' }} />
              <Typography variant="h6" color="textSecondary">
                Total General: ${totalVentas.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem' }}>
              <Box sx={{ mr: 2 }}>DÍA</Box>
              <Box sx={{ mr: 2 }}>MENSUAL</Box>
              <Box>ANUAL</Box>
            </Box>
          </Paper>
        </Grid>

        {/* Top Categorías */}
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
                backgroundColor: '#f5f5f5',
                flexDirection: 'column'
              }}
            >
              {topCategorias.map((cat, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mb: 1 }}>
                  <Typography>{cat.categoria}</Typography>
                  <Typography fontWeight="bold">{cat.ventas} ventas</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Stock de Inventario */}
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
                backgroundColor: '#f5f5f5',
                flexDirection: 'column'
              }}
            >
              {stockData.map((producto, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', mb: 0.5 }}>
                  <Typography variant="body2">{producto.nombre}</Typography>
                  <Typography variant="body2" fontWeight="bold" 
                    sx={{ color: producto.stock < 10 ? 'error.main' : 'success.main' }}>
                    {producto.stock} unidades
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Acciones Rápidas */}
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
                >
                  Agregar Nuevo Usuario
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LocalOfferIcon />}
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
                >
                  Nueva Receta
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Alertas y Notificaciones */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Alertas del Sistema
            </Typography>
            
            {alertas.length > 0 ? (
              alertas.map((alerta, index) => (
                <Box key={index} sx={{ borderLeft: `3px solid ${PRIMARY_COLOR}`, pl: 1, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: PRIMARY_COLOR }}>
                    <NotificationsActiveIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {alerta.tipo}: {alerta.mensaje}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(alerta.fecha).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No hay alertas activas
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Pedidos de Proveedores Pendientes */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Pedidos De Proveedores Pendientes
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID ORDEN</TableCell>
                    <TableCell>PROVEEDOR</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>FECHA</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedidosPendientes.map((pedido) => (
                    <TableRow key={pedido._id}>
                      <TableCell>{pedido._id?.slice(-6) || 'N/A'}</TableCell>
                      <TableCell>{pedido.proveedor?.nombre || 'Proveedor'}</TableCell>
                      <TableCell>${pedido.totalCompra?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{new Date(pedido.fechaCompra).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: pedido.estado === 'pendiente' ? PRIMARY_COLOR : 'green',
                            fontWeight: 'bold'
                          }}
                        >
                          {pedido.estado?.toUpperCase() || 'PENDIENTE'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {pedidosPendientes.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                No hay pedidos pendientes
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SalesAnalyticsDashboard;
