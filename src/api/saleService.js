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
    console.log("Enviando detalhe de venda:", data);  // Log para verificar o que está sendo enviado
    return api.post('/Sale/add-detail', data)
      .then((response) => {
        console.log("Resposta do backend ao adicionar detalhe:", response.data); // Log para verificar a resposta do backend
        return response.data; // Certifique-se de retornar os dados diretamente
      })
      .catch((error) => {
        console.error("Erro ao adicionar detalhe de venda:", error);
        throw error; // Lança o erro para ser tratado no componente chamador
      });
  },

  getSaleDetails: (saleId) => {
    console.log("Buscando detalhes da venda para SaleId:", saleId);  
    return api.get(`/Sale/${saleId}/details`)
      .then((response) => {
        console.log("Resposta do backend ao buscar detalhes da venda:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da venda:", error);
        throw error;
      });
  },
  
  
  // Completar uma venda existente
  complete: (data) => api.post('/Sale/complete', data),

  // Atualizar uma venda existente
  update: (data) => api.put('/Sale/update', data),

  // Buscar os totais da venda por ID
  getSaleTotals: (saleId) => {
    console.log("Buscando Totais da venda para SaleId:", saleId);  
    return api.get(`/Sale/sale/${saleId}/totals`)
      .then((response) => {
        console.log("Resposta do backend ao buscar totais:", response.data);
        return response.data;  // Retorna os totais da venda
      })
      .catch((error) => {
        console.error("Erro ao buscar os totais da venda:", error);
        throw error; // Lança o erro para ser tratado
      });
  },

  // Remover um detalhe da venda
  removeDetail: (saleId, saleDetailId) => {
    console.log(`Fazendo DELETE para remover detalhe com saleId=${saleId} e saleDetailId=${saleDetailId}`); // Verificar IDs corretos
    return api.delete(`/Sale/remove-detail/${saleId}/${saleDetailId}`)
      .then((response) => {
        console.log("Detalhe de venda removido com sucesso:", response);
        return response.data; // Retorna o sucesso da operação
      })
      .catch((error) => {
        console.error("Erro ao remover detalhe de venda:", error);
        throw error; // Lança o erro para ser tratado no componente chamador
      });
  },
};
