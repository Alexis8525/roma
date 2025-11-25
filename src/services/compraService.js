import api from './api';

export const compraService = {
  getCompras: () => api.get('/compras'),
  getCompraById: (id) => api.get(`/compras/${id}`),
  createCompra: (compraData) => api.post('/compras', compraData),
  updateCompra: (id, compraData) => api.put(`/compras/${id}`, compraData),
  deleteCompra: (id) => api.delete(`/compras/${id}`)
};