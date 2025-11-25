import api from './api';

export const alertaService = {
  getAlertas: () => api.get('/alertas'),
  getAlertaById: (id) => api.get(`/alertas/${id}`),
  createAlerta: (alertaData) => api.post('/alertas', alertaData),
  updateAlerta: (id, alertaData) => api.put(`/alertas/${id}`, alertaData),
  deleteAlerta: (id) => api.delete(`/alertas/${id}`),
  generarAlertasInventario: () => api.post('/alertas/generar/inventario')
};
