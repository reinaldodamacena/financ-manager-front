import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const customerService = {
  create: (data) => api.post('/Customer', data),  // Corrigido para o caminho correto
  update: (data) => api.put('/Customer', data),  // Corrigido para o caminho correto
  delete: (id) => api.delete(`/Customer/${id}`),  // Corrigido para o caminho correto
  fetchById: (id) => api.get(`/Customer/${id}`),  // Corrigido para o caminho correto
  fetchAll: () => api.get('/Customer'),  // Corrigido para o caminho correto
  fetchByName: (nameOrCompanyName) => api.get(`/Customer/search`, { params: { nameOrCompanyName } }),  // Novo método para busca por nome
};
