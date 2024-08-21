// src/api/healthCheckService.js

import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Verifica a saúde da aplicação
export const checkHealth = async () => {
  try {
    const response = await api.get('/healthcheck');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};
