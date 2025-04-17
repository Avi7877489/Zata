import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { loginUser, registerUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if token exists and is valid on app startup
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Check if token is expired
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token is expired
            localStorage.removeItem('token');
            setCurrentUser(null);
          } else {
            // Token is valid, get user data
            const user = await getCurrentUser();
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    // Listen for OAuth success messages from popup window
    const handleOAuthMessage = (event) => {
      if (event.data.type === 'AUTH_SUCCESS' && event.data.token) {
        localStorage.setItem('token', event.data.token);
        checkAuth();
        navigate('/app/dashboard');
      }
    };
    
    window.addEventListener('message', handleOAuthMessage);
    
    return () => {
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, [navigate]);
  
  // Login function
  const login = async (email, password) => {
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Register function
  const register = async (name, email, password) => {
    try {
      const { token, user } = await registerUser(name, email, password);
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };
  
  // OAuth login
  const oauthLogin = (provider) => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/${provider}`,
      'OAuth Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };
  
  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    oauthLogin
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};