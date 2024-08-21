// src/api/customerAddressService.js

import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Cria um novo endereço de cliente
export const createCustomerAddress = async (customerAddressData) => {
  return await api.post('/customeraddresses', customerAddressData);
};

// Atualiza um endereço de cliente existente
export const updateCustomerAddress = async (customerAddressData) => {
  return await api.put('/customeraddresses', customerAddressData);
};

// Deleta um endereço de cliente pelo ID
export const deleteCustomerAddress = async (id) => {
  return await api.delete(`/customeraddresses/${id}`);
};

// Busca um endereço de cliente pelo ID
export const fetchCustomerAddressById = async (id) => {
  return await api.get(`/customeraddresses/${id}`);
};

// Busca todos os endereços de clientes
export const fetchCustomerAddresses = async () => {
  return await api.get('/customeraddresses');
};
