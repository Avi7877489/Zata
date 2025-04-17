import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AuthButtons = () => {
  const { oauthLogin } = useAuth();
  
  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={() => oauthLogin('google')}
        className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <FaGoogle className="text-red-500" />
        <span>Continue with Google</span>
      </button>
      
      <button
        onClick={() => oauthLogin('github')}
        className="flex items-center justify-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
      >
        <FaGithub />
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
};

export default AuthButtons;