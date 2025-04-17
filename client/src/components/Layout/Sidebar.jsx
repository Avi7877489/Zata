import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaFileAlt, FaUser, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium">{currentUser?.name}</h3>
          <p className="text-sm text-gray-400 truncate">{currentUser?.email}</p>
        </div>
      </div>
      
      <nav className="mt-5">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/app/files"
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <FaFileAlt className="mr-3" />
          Files
        </NavLink>
        <NavLink
          to="/app/profile"
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <FaUser className="mr-3" />
          Profile
        </NavLink>
        <NavLink
          to="/app/settings"
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <FaCog className="mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;