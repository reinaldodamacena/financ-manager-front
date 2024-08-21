import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const customerService = {
  create: (data) => api.post('/customers', data),
  update: (data) => api.put('/customers', data),
  delete: (id) => api.delete(`/customers/${id}`),
  fetchById: (id) => api.get(`/customers/${id}`),
  fetchAll: () => api.get('/customers'),
};
