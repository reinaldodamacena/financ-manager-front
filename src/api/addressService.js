// src/api/addressService.js

import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Cria um novo endereço
export const createAddress = async (addressData) => {
  return await api.post('/addresses', addressData);
};

// Atualiza um endereço existente
export const updateAddress = async (addressData) => {
  return await api.put('/addresses', addressData);
};

// Deleta um endereço pelo ID
export const deleteAddress = async (id) => {
  return await api.delete(`/addresses/${id}`);
};

// Busca um endereço pelo ID
export const fetchAddressById = async (id) => {
  return await api.get(`/addresses/${id}`);
};

// Busca todos os endereços
export const fetchAddresses = async () => {
  return await api.get('/addresses');
};
