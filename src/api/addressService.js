import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const addressService = {
  create: (data) => api.post('/addresses', data),
  update: (data) => api.put('/addresses', data),
  delete: (id) => api.delete(`/addresses/${id}`),
  fetchById: (id) => api.get(`/addresses/${id}`),
  fetchAll: () => api.get('/addresses'),
};
