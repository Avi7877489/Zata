import api from './api.js';

export const loginUser = async (email, password) => {
  try {
    console.log(`Sending login request for: ${email}`);
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response received:', response.status);
    
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
    }
    throw error.response?.data?.error || error.message || 'Login failed';
  }
};

export const registerUser = async (name, email, password) => {
  try {
    console.log(`Sending registration request for: ${email}`);
    const response = await api.post('/auth/register', { name, email, password });
    console.log('Registration response received:', response.status);
    
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
    }
    throw error.response?.data?.error || error.message || 'Registration failed';
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('Fetching current user data');
    const response = await api.get('/auth/success');
    console.log('Current user response received:', response.status);
    
    if (!response.data || !response.data.user) {
      throw new Error('Invalid user data received from server');
    }
    
    return response.data.user;
  } catch (error) {
    console.error('Get current user API error:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
    }
    throw error.response?.data?.error || error.message || 'Failed to get user';
  }
};