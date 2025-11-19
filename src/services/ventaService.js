import api from './api';

export const ventaService = {
  getVentas: () => api.get('/ventas'),
  getVentaById: (id) => api.get(`/ventas/${id}`),
  createVenta: (ventaData) => api.post('/ventas', ventaData),
  deleteVenta: (id) => api.delete(`/ventas/${id}`),
  
  // Estadísticas - necesitarás agregar estos endpoints al backend
  getVentasHoy: () => api.get('/ventas/estadisticas/hoy'),
  getTopCategorias: () => api.get('/ventas/estadisticas/categorias'),
  getVentasMensuales: () => api.get('/ventas/estadisticas/mensual')
};
