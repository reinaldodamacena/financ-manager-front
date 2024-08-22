import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const authService = {
  login: async (data) => {
    try {
      console.log('Login Data:', data); // Verifica o que está sendo enviado
      const response = await api.post('/Auth/login', data);
      return response.data; // Supondo que o token esteja no response.data.Token
    } catch (error) {
      // Captura e exibe detalhes do erro
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data); // Verifica os detalhes do erro
      } else {
        console.error('Login failed:', error);
      }
      throw error;
    }
  },
  // Outros métodos de autenticação podem ser adicionados aqui, como logout, refresh token, etc.
};
