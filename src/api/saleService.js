import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleService = {
  create: (data) => api.post('/sales', data),
  update: (data) => api.put('/sales', data),
  delete: (id) => api.delete(`/sales/${id}`),
  fetchById: (id) => api.get(`/sales/${id}`),
  fetchAll: () => api.get('/sales'),
};
