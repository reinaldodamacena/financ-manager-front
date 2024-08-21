import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const salesAuditService = {
  create: (data) => api.post('/salesaudits', data),
  update: (data) => api.put('/salesaudits', data),
  delete: (id) => api.delete(`/salesaudits/${id}`),
  fetchById: (id) => api.get(`/salesaudits/${id}`),
  fetchAll: () => api.get('/salesaudits'),
};
