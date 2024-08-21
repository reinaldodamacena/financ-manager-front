import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const inventoryService = {
  create: (data) => api.post('/inventories', data),
  update: (data) => api.put('/inventories', data),
  delete: (id) => api.delete(`/inventories/${id}`),
  fetchById: (id) => api.get(`/inventories/${id}`),
  fetchAll: () => api.get('/inventories'),
};
