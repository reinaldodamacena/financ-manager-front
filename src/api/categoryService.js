import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const categoryService = {
  create: (data) => api.post('/categories', data),
  update: (data) => api.put('/categories', data),
  delete: (id) => api.delete(`/categories/${id}`),
  fetchById: (id) => api.get(`/categories/${id}`),
  fetchAll: () => api.get('/categories'),
};
