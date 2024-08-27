import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const productService = {
  create: (data) => api.post('/Product', data),
  update: (data) => api.put('/Product', data),
  delete: (id) => api.delete(`/Product/${id}`),
  fetchById: (id) => api.get(`/Product/${id}`),
  fetchAll: () => api.get('/Product'),
  fetchByCode: (manufacturerCode, barcode) => {
    const params = {};
    if (manufacturerCode) params.manufacturerCode = manufacturerCode;
    if (barcode) params.barcode = barcode;

    return api.get('/Product/search', { params });
  },
  fetchByDescription: (description) => {
    return api.get('/Product/search-by-description', {
      params: { description },
    });
  },
};

// services/productService.js
export const prepareProductForAPI = (product, priceFormation, userId) => {
  return {
    product: {
      ...product,
      createdBy: product.createdBy || userId,
      updatedBy: product.updatedBy || userId,
      dateOfRegistration: new Date().toISOString(),
      dateOfLastChange: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    priceFormation: {
      ...priceFormation,
      date: new Date().toISOString(),
    }
  };
};

