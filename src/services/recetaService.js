import api from './api';

export const recetaService = {
  getRecetas: async () => {
    try {
      const response = await api.get('/recetas');
      return response;
    } catch (error) {
      console.error('Error en getRecetas:', error);
      throw error;
    }
  },
  
  getRecetaById: async (id) => {
    const response = await api.get(`/recetas/${id}`);
    return response;
  },
  
  createReceta: async (recetaData) => {
    const response = await api.post('/recetas', recetaData);
    return response;
  },
  
  updateReceta: async (id, recetaData) => {
    const response = await api.put(`/recetas/${id}`, recetaData);
    return response;
  },
  
  deleteReceta: async (id) => {
    const response = await api.delete(`/recetas/${id}`);
    return response;
  }
};
