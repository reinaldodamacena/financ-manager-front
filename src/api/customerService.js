// src/api/customerService.js

import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Cria um novo cliente
export const createCustomer = async (customerData) => {
  return await api.post('/customers', customerData);
};

// Atualiza um cliente existente
export const updateCustomer = async (customerData) => {
  return await api.put('/customers', customerData);
};

// Deleta um cliente pelo ID
export const deleteCustomer = async (id) => {
  return await api.delete(`/customers/${id}`);
};

// Busca um cliente pelo ID
export const fetchCustomerById = async (id) => {
  return await api.get(`/customers/${id}`);
};

// Busca todos os clientes
export const fetchCustomers = async () => {
  return await api.get('/customers');
};
