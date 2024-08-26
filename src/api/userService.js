import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const userService = {
  create: (data) => {
    console.log(`Sending POST request to: ${config.API_BASE_URL}/users with data:`, data);
    return api.post('/User', data);
  },
  
  update: (data) => api.put('/User', data),
  delete: (id) => api.delete(`/User/${id}`),
  fetchById: (id) => api.get(`/User/${id}`),
  fetchAll: () => api.get('/User'),
};
