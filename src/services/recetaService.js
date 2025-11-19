import api from './api';

export const recetaService = {
  getRecetas: () => api.get('/recetas'),
  getRecetaById: (id) => api.get(`/recetas/${id}`),
  createReceta: (recetaData) => api.post('/recetas', recetaData),
  updateReceta: (id, recetaData) => api.put(`/recetas/${id}`, recetaData),
  deleteReceta: (id) => api.delete(`/recetas/${id}`)
};
