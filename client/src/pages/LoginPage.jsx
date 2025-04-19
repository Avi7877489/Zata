import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { currentUser, loading, authChecked } = useAuth();
  
  useEffect(() => {
    console.log('LoginPage rendered - Auth state:', {
      user: !!currentUser,
      loading,
      checked: authChecked
    });
  }, [currentUser, loading, authChecked]);
  
  // Only redirect if auth is checked and user exists
  if (authChecked && currentUser) {
    console.log('User is authenticated, redirecting to dashboard');
    return <Navigate to="/app/dashboard" replace />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="mt-3 text-gray-600">Loading...</p>
          </div>
        ) : (
          <Login />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;