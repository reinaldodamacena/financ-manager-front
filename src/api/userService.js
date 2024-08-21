import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const userService = {
  create: (data) => api.post('/users', data),
  update: (data) => api.put('/users', data),
  delete: (id) => api.delete(`/users/${id}`),
  fetchById: (id) => api.get(`/users/${id}`),
  fetchAll: () => api.get('/users'),
};
