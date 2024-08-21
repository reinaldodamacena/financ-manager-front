import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const roleService = {
  create: (data) => api.post('/roles', data),
  update: (data) => api.put('/roles', data),
  delete: (id) => api.delete(`/roles/${id}`),
  fetchById: (id) => api.get(`/roles/${id}`),
  fetchAll: () => api.get('/roles'),
};
