// src/api/categoryService.js

import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Cria uma nova categoria
export const createCategory = async (categoryData) => {
  return await api.post('/categories', categoryData);
};

// Atualiza uma categoria existente
export const updateCategory = async (categoryData) => {
  return await api.put('/categories', categoryData);
};

// Deleta uma categoria pelo ID
export const deleteCategory = async (id) => {
  return await api.delete(`/categories/${id}`);
};

// Busca uma categoria pelo ID
export const fetchCategoryById = async (id) => {
  return await api.get(`/categories/${id}`);
};

// Busca todas as categorias
export const fetchCategories = async () => {
  return await api.get('/categories');
};
