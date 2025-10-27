import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } });

export const getCategories = async () => (await api.get('/categories')).data;
export const createCategory = async (data) => (await api.post('/categories', data)).data;
export const deleteCategory = async (id) => (await api.delete(`/categories/${id}`)).data;

export const getExpenses = async () => (await api.get('/expenses')).data;
export const getTotalExpenses = async () => (await api.get('/expenses/total')).data;
export const getExpensesByCategory = async () => (await api.get('/expenses/by-category')).data;
export const createExpense = async (data) => (await api.post('/expenses', data)).data;
export const deleteExpense = async (id) => (await api.delete(`/expenses/${id}`)).data;

export default api;