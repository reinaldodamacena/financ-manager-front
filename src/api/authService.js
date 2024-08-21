import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const authService = {
  login: async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data; // Supondo que o token esteja no response.data.Token
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  // Outros métodos de autenticação podem ser adicionados aqui, como logout, refresh token, etc.
};
