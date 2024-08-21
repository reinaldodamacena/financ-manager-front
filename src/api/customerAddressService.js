import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const customerAddressService = {
  create: (data) => api.post('/customeraddresses', data),
  update: (data) => api.put('/customeraddresses', data),
  delete: (id) => api.delete(`/customeraddresses/${id}`),
  fetchById: (id) => api.get(`/customeraddresses/${id}`),
  fetchAll: () => api.get('/customeraddresses'),
};
