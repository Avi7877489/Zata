import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, authChecked } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log(`Protected route at: ${location.pathname}`);
    console.log(`Auth state - loading: ${loading}, authenticated: ${!!currentUser}, checked: ${authChecked}`);
  }, [loading, currentUser, authChecked, location]);
  
  // Show loading spinner while checking auth
  if (loading) {
    console.log("Authentication loading, showing spinner");
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Verifying your authentication...</p>
      </div>
    );
  }
  
  // If auth check is complete and no user, redirect to login
  if (authChecked && !currentUser) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Auth check complete and user is authenticated
  console.log("User authenticated, rendering protected content");
  return children;
};

export default ProtectedRoute;