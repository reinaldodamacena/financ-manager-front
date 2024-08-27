import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const priceFormationService = {
  create: (data) => api.post('/PriceFormation', data),
  update: (data) => api.put('/PriceFormation', data),
  delete: (id) => api.delete(`/PriceFormation/${id}`),
  fetchById: (id) => api.get(`/PriceFormation/${id}`),
  fetchAll: () => api.get('/PriceFormation'),
};
export const priceService = {
  calculateFinalPrice: async ({ costPrice, markupPercentage }) => {
      const response = await  api.post('/PriceFormation/calculate-final-price', {
          costPrice,
          markupPercentage
      });
      return response.data;
  }
};