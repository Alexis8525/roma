import api from './api';

export const productoService = {
  getProductos: () => api.get('/productos'),
  getProductoById: (id) => api.get(`/productos/${id}`),
  createProducto: (productoData) => {
    // Para crear producto con imagen
    const formData = new FormData();
    Object.keys(productoData).forEach(key => {
      formData.append(key, productoData[key]);
    });
    return api.post('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateProducto: (id, productoData) => api.put(`/productos/${id}`, productoData),
  deleteProducto: (id) => api.delete(`/productos/${id}`)
};
