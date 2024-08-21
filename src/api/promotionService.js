import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const promotionService = {
  create: (data) => api.post('/promotions', data),
  update: (data) => api.put('/promotions', data),
  delete: (id) => api.delete(`/promotions/${id}`),
  fetchById: (id) => api.get(`/promotions/${id}`),
  fetchAll: () => api.get('/promotions'),
};
