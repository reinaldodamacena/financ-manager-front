import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleDetailService = {
  create: (data) => api.post('/saledetails', data),
  update: (data) => api.put('/saledetails', data),
  delete: (id) => api.delete(`/saledetails/${id}`),
  fetchById: (id) => api.get(`/saledetails/${id}`),
  fetchAll: () => api.get('/saledetails'),
};
