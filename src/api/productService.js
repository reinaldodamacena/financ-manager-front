import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const productService = {
  create: (data) => api.post('/products', data),
  update: (data) => api.put('/products', data),
  delete: (id) => api.delete(`/products/${id}`),
  fetchById: (id) => api.get(`/products/${id}`),
  fetchAll: () => api.get('/products'),
  fetchByCode: (manufacturerCode, barcode) => {
    const params = {};
    if (manufacturerCode) params.manufacturerCode = manufacturerCode;
    if (barcode) params.barcode = barcode;

    return api.get('/products/search', { params });
  },
};
