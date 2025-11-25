import api from './api';

export const productoService = {
  getProductos: async () => {
    const response = await api.get('/productos');
    return response;
  },
  
  getProductoById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response;
  },
  
  createProducto: async (productoData) => {
    // Para crear producto con imagen
    const formData = new FormData();
    Object.keys(productoData).forEach(key => {
      if (productoData[key] !== null && productoData[key] !== undefined) {
        formData.append(key, productoData[key]);
      }
    });
    
    return api.post('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  updateProducto: async (id, productoData) => {
    const response = await api.put(`/productos/${id}`, productoData);
    return response;
  },
  
  deleteProducto: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response;
  }
};
