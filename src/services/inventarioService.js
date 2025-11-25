import api from './api';

export const inventarioService = {
  getInventario: () => api.get('/inventario'),
  getProducto: (id) => api.get(`/inventario/${id}`),
  createProducto: (productoData) => api.post('/inventario', productoData),
  updateProducto: (id, productoData) => api.put(`/inventario/${id}`, productoData),
  deleteProducto: (id) => api.delete(`/inventario/${id}`),
  buscarProducto: (query) => api.get(`/inventario/buscar?q=${query}`),
  
  // Para alertas de stock bajo
  getStockBajo: () => api.get('/alertas/generar/inventario')
};
