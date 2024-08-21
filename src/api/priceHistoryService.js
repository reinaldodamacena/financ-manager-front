import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const priceHistoryService = {
  create: (data) => api.post('/pricehistories', data),
  update: (data) => api.put('/pricehistories', data),
  delete: (id) => api.delete(`/pricehistories/${id}`),
  fetchById: (id) => api.get(`/pricehistories/${id}`),
  fetchAll: () => api.get('/pricehistories'),
};
