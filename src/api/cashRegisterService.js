import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

const CashRegisterService = {
    abrirCaixa: async (data) => {
      const response = await api.post('/CashRegister/open', data);
      return response.data;
    },
  
    fecharCaixa: async (data) => {
      const response = await api.post('/CashRegister/close', data);
      return response.data;
    },
  
    obterCaixaPorId: async (id) => {
      const response = await api.get(`/CashRegister/${id}`);
      return response.data;
    },
  
    obterAuditoriasPorCaixaId: async (id) => {
      const response = await api.get(`/CashRegister/${id}/audits`);
      return response.data;
    },
  
    obterCaixasAbertos: async () => {
      const response = await api.get('/CashRegister/open');
      return response.data;
    },
  };
  
  export default CashRegisterService;