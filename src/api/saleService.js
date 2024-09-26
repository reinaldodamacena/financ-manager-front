import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleService = {
  // Iniciar uma nova venda
  start: (data) => api.post('/Sale/start', data),

  // Completar uma venda existente
  complete: (data) => api.post('/Sale/complete', data),
  // Atualizar uma venda existente
  update: (data) => api.put('/Sale/update', data),
  // Buscar os totais da venda por ID
  
  getSaleTotals: (saleId) => {
    console.log("Buscando Totais da venda para SaleId:", saleId);
    return api.get(`/Sale/${saleId}/totals`)
      .then((response) => {
        console.log("Resposta do backend ao buscar totais:", response.data);
        return response.data;  // Retorna os totais da venda
      })
      .catch((error) => {
        console.error("Erro ao buscar os totais da venda:", error);
        throw error; // Lança o erro para ser tratado
      });
  },

  // **Novo método para listar o histórico de vendas**
  getSalesHistory: (startDate, endDate) => {
    console.log(startDate, endDate);
    return api.get(`/Sale/sales-history-report`, {
      params: {
        startDate,
        endDate

      }
    })
      .then((response) => {
        console.log("Histórico de vendas recebido:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao buscar o histórico de vendas:", error);
        throw error;  // Lança o erro para ser tratado
      });
  },
  // **Novo método para ajustar o percentual de desconto**
  adjustDiscountPercentage: (saleId, discountPercentage) => {
    return api.post(`/Sale/${saleId}/adjust-discount-percentage`, discountPercentage)
      .then((response) => {
        console.log("Percentual de desconto ajustado:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao ajustar percentual de desconto:", error);
        throw error;
      });
  },

  // **Novo método para ajustar o novo total líquido**
  adjustNewTotal: (saleId, newTotalNetAmount) => {
    return api.post(`/Sale/${saleId}/adjust-new-total`, newTotalNetAmount)
      .then((response) => {
        console.log("Novo total ajustado:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao ajustar o novo total líquido:", error);
        throw error;
      });
  },

  // **Novo método para ajustar o total de desconto**
  adjustTotalDiscount: (saleId, totalDiscount) => {
    return api.post(`/Sale/${saleId}/adjust-total-discount`, totalDiscount)
      .then((response) => {
        console.log("Total de desconto ajustado:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao ajustar o total de desconto:", error);
        throw error;
      });
  }
};
