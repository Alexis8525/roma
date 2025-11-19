import api from './api';

export const usuarioService = {
  getUsuarios: () => api.get('/usuarios'),
  getUsuarioById: (id) => api.get(`/usuarios/${id}`),
  createUsuario: (usuarioData) => api.post('/usuarios', usuarioData),
  updateUsuario: (id, usuarioData) => api.put(`/usuarios/${id}`, usuarioData),
  deleteUsuario: (id) => api.delete(`/usuarios/${id}`)
};
