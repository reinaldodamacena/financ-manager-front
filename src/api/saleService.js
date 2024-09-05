import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleService = {
  // Iniciar uma nova venda
  start: (data) => api.post('/Sale/start', data),

  // Adicionar um detalhe à venda
  addDetail: (data) => {
    console.log("Enviando detalhe de venda:", data);  // Verifique se esse log aparece
    return api.post('/Sale/add-detail', data).then((response) => {
      console.log("Resposta do backend ao adicionar detalhe:", response);
      return response;
    }).catch((error) => {
      console.error("Erro ao adicionar detalhe de venda:", error);
    });
  },

  // Completar uma venda existente
  complete: (data) => api.post('/Sale/complete', data),

  // Atualizar uma venda existente
  update: (data) => api.put('/Sale/update', data),

  // Excluir uma venda
  delete: (id) => api.delete(`/Sale/delete/${id}`),

  // Buscar uma venda por ID
  fetchById: (id) => api.get(`/Sale/${id}`),

  // Buscar todas as vendas
  fetchAll: () => api.get('/Sale'),
};
