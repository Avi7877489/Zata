import React from 'react';
import { Navigate } from 'react-router-dom';
import Register from '../components/Auth/Register';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/app/dashboard" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Register />
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;