import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const priceFormationService = {
  create: (data) => api.post('/priceformations', data),
  update: (data) => api.put('/priceformations', data),
  delete: (id) => api.delete(`/priceformations/${id}`),
  fetchById: (id) => api.get(`/priceformations/${id}`),
  fetchAll: () => api.get('/priceformations'),
};
