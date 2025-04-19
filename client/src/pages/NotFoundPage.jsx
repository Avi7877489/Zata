import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-4">Page not found</h2>
          <p className="mt-4 text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link to="/" className="px-4 py-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
              Go back home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;