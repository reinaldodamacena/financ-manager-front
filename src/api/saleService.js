import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleService = {
  // Iniciar uma nova venda
  start: (data) => api.post('/sale/start', data),

  // Adicionar um detalhe à venda
  addDetail: (data) => api.post('/sale/add-detail', data),

  // Completar uma venda existente
  complete: (data) => api.post('/sale/complete', data),

  // Atualizar uma venda existente
  update: (data) => api.put('/sale/update', data),

  // Excluir uma venda
  delete: (id) => api.delete(`/sale/delete/${id}`),

  // Buscar uma venda por ID
  fetchById: (id) => api.get(`/sale/${id}`),

  // Buscar todas as vendas
  fetchAll: () => api.get('/sale'),
};
