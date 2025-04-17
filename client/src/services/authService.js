import api from './api.js';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/success');
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to get user';
  }
};