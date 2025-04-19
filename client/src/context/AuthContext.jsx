import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser, registerUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  
  // Check if token exists and is valid on app startup
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication state...");
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Check if token is expired
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          console.log("Token validation - Current time:", currentTime, "Expiration:", decoded.exp);
          
          if (decoded.exp < currentTime) {
            // Token is expired
            console.log("Token expired, clearing auth state");
            localStorage.removeItem('token');
            setCurrentUser(null);
          } else {
            // Token is valid, get user data
            console.log("Token valid, fetching current user data");
            try {
              const user = await getCurrentUser();
              console.log("User data received:", user);
              setCurrentUser(user);
            } catch (error) {
              console.error("Failed to get user data:", error);
              localStorage.removeItem('token');
              setCurrentUser(null);
            }
          }
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      } else {
        console.log("No token found");
      }
      
      setLoading(false);
      setAuthChecked(true);
      console.log("Auth check complete, user state:", currentUser ? "Authenticated" : "Not authenticated");
    };
    
    checkAuth();
    
    // Listen for OAuth success messages from popup window
    const handleOAuthMessage = (event) => {
      if (event.data.type === 'AUTH_SUCCESS' && event.data.token) {
        console.log("OAuth login success, setting token");
        localStorage.setItem('token', event.data.token);
        checkAuth();
      }
    };
    
    window.addEventListener('message', handleOAuthMessage);
    
    return () => {
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      console.log("Login attempt for:", email);
      setLoading(true);
      const { token, user } = await loginUser(email, password);
      console.log("Login successful, setting token and user");
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setLoading(false);
      return { token, user };
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      throw error;
    }
  };
  
  // Register function
  const register = async (name, email, password) => {
    try {
      console.log("Registration attempt for:", email);
      setLoading(true);
      const { token, user } = await registerUser(name, email, password);
      console.log("Registration successful, setting token and user");
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setLoading(false);
      return { token, user };
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      throw error;
    }
  };
  
  // Logout function
  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };
  
  // OAuth login
  const oauthLogin = (provider) => {
    console.log(`Initiating OAuth login with ${provider}`);
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
    authChecked,
    login,
    register,
    logout,
    oauthLogin
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};