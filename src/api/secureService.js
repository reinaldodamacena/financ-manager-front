import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

export const secureService = {
  fetchAdminData: () => api.get('/secure/admin'),
  fetchUserData: () => api.get('/secure/user'),
};
