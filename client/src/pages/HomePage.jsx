import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaLock, FaFolder, FaMobileAlt } from 'react-icons/fa';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Secure File Storage and Sharing Made Simple
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Store, share, and access your files from anywhere with enterprise-grade security.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-gray-700 text-white hover:bg-blue-700 focus:ring-blue-500 text-center text-base font-medium px-8 py-3 mt-5"
                  >
                    Get Started For Free
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white text-blue-600 hover:bg-blue-50 text-center text-base font-medium px-8 py-3 rounded-full mt-5"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="https://zata.ai/assets/CenterDesign-DZV15Cob.svg"
                  alt="File storage illustration"
                  className="rounded-full m-auto shadow-xl  w-100"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose Zata?
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Our platform combines security, simplicity, and speed to give you the best file management experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaCloudUploadAlt className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Fast Upload</h3>
                <p className="text-gray-500">
                  Upload files of any size with our optimized cloud infrastructure.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaLock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Storage</h3>
                <p className="text-gray-500">
                  All files are encrypted at rest and in transit for maximum security.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaFolder className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Organization</h3>
                <p className="text-gray-500">
                  Organize your files with tags, folders, and smart search.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaMobileAlt className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Access Anywhere</h3>
                <p className="text-gray-500">
                  Access your files from any device with our responsive web app.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">Create your free account today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
