import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const saleDetailService = {

  // Adicionar um detalhe à venda
  addDetail: (data) => {
    console.log("Enviando detalhe de venda:", data);  // Log para verificar o que está sendo enviado
    return api.post('/SaleDetails/add', data)
      .then((response) => {
        console.log("Resposta do backend ao adicionar detalhe:", response.data); // Log para verificar a resposta do backend
        return response.data; // Certifique-se de retornar os dados diretamente
      })
      .catch((error) => {
        console.error("Erro ao adicionar detalhe de venda:", error);
        throw error; // Lança o erro para ser tratado no componente chamador
      });
  },


  // Remover um detalhe da venda
  removeDetail: (saleId, saleDetailId) => {
    console.log(`Fazendo DELETE para remover detalhe com saleId=${saleId} e saleDetailId=${saleDetailId}`); // Verificar IDs corretos
    return api.delete(`/SaleDetails/remove/${saleId}/${saleDetailId}`)
      .then((response) => {
        console.log("Detalhe de venda removido com sucesso:", response);
        return response.data; // Retorna o sucesso da operação
      })
      .catch((error) => {
        console.error("Erro ao remover detalhe de venda:", error);
        throw error; // Lança o erro para ser tratado no componente chamador
      });
  },

  getSaleDetails: (saleId) => {
    console.log("Buscando detalhes da venda para SaleId:", saleId);  
    return api.get(`/SaleDetails/${saleId}/details`)
      .then((response) => {
        console.log("Resposta do backend ao buscar detalhes da venda:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da venda:", error);
        throw error;
      });
  },
  

// Atualizar um detalhe de venda
updateDetail: (saleDetailId, updatedData) => {
  console.log(`Atualizando Ser vice SaleDetailId=${saleDetailId}:`, updatedData);
  return api.put('/SaleDetails/update', {
    //saleDetailId,  // Inclui o SaleDetailId no corpo
    ...updatedData  // Inclui os outros dados atualizados
  })
  .then((response) => {
    console.log("Detalhe de venda atualizado com sucesso:", response.data);
    return response.data;
  })
  .catch((error) => {
    console.error("Erro ao atualizar detalhe de venda:", error.response?.data || error.message);
    throw error;
  });
}



  
};
