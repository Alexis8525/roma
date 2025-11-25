// services/ventaService.js
import api from './api';

export const ventaService = {
  getVentas: async () => {
    try {
      console.log("🔄 Solicitando ventas al backend...");
      const response = await api.get('/ventas');
      console.log("✅ Respuesta recibida:", response.data);
      return response;
    } catch (error) {
      console.error("❌ Error en getVentas:", error);
      // Si hay error 404, retornar array vacío para que no rompa la aplicación
      if (error.response?.status === 404) {
        console.log("⚠️  Endpoint no encontrado, retornando array vacío");
        return { data: [] };
      }
      throw error;
    }
  },
  
  getVentaById: async (id) => {
    const response = await api.get(`/ventas/${id}`);
    return response;
  },
  
  createVenta: async (ventaData) => {
    const response = await api.post('/ventas', ventaData);
    return response;
  },
  
  deleteVenta: async (id) => {
    const response = await api.delete(`/ventas/${id}`);
    return response;
  },
  
  getVentasHoy: async () => {
    try {
      const response = await api.get('/ventas/estadisticas/hoy');
      return response;
    } catch (error) {
      console.error("❌ Error en getVentasHoy:", error);
      // Retornar datos por defecto si el endpoint no existe
      return { data: { total: 0, cantidad: 0 } };
    }
  },
  
  getTopCategorias: async () => {
    try {
      const response = await api.get('/ventas/estadisticas/categorias');
      return response;
    } catch (error) {
      console.error("❌ Error en getTopCategorias:", error);
      // Retornar datos por defecto
      return { data: [
        { categoria: 'Panadería', ventas: 45 },
        { categoria: 'Pastelería', ventas: 32 },
        { categoria: 'Bebidas', ventas: 28 }
      ] };
    }
  },
  
  getVentasMensuales: async () => {
    try {
      const response = await api.get('/ventas/estadisticas/mensual');
      return response;
    } catch (error) {
      console.error("❌ Error en getVentasMensuales:", error);
      return { data: { total: 0 } };
    }
  },

  // Método de prueba
  testConnection: async () => {
    try {
      const response = await api.get('/ventas/test');
      return response;
    } catch (error) {
      console.error("❌ Error en testConnection:", error);
      throw error;
    }
  }
};
