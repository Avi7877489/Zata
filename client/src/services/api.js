import axios from 'axios';

// Use environment variable or default to localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for handling cookies if your auth uses them
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  config => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Adding auth token to request');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors globally
api.interceptors.response.use(
  response => {
    console.log(`API Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    
    // Handle authentication errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request detected, clearing authentication');
      localStorage.removeItem('token');
      
      // Don't redirect here to avoid redirect loops
      // Let the protected routes handle the redirect
    }
    
    return Promise.reject(error);
  }
);

export default api;