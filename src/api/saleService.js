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


  // **Função para buscar os totais da venda por ID**
  getSaleTotals: (saleId) => {
    return api.get(`/Sale/sale/${saleId}/totals`)
      .then((response) => {
        return response.data;  // Retorna os totais da venda
      })
      .catch((error) => {
        console.error("Erro ao buscar os totais da venda:", error);
      });
  },

  removeDetail: (saleId, saleDetailId) => {
    console.log(`Fazendo DELETE para remover detalhe com saleId=${saleId} e saleDetailId=${saleDetailId}`); // Verifica se os IDs estão corretos
    return api.delete(`/Sale/remove-detail/${saleId}/${saleDetailId}`)
      .then((response) => {
        console.log("Detalhe de venda removido com sucesso:", response);
        return response;
      })
      .catch((error) => {
        console.error("Erro ao remover detalhe de venda:", error);
        throw error;
      });
  },
  
};
