import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets'; // No longer needed for direct image import
import { AdminContext } from '../context/AdminContext';
import { FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    setAToken('');
    localStorage.removeItem('aToken');
    navigate('/');
  };

  return (
    <nav className="bg-white px-8 py-4 shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side - Icons and User Profile */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-500 hover:text-purple-600 transition-colors">
            <FaBell className="w-6 h-6" />
          </button>
          <button className="text-gray-500 hover:text-purple-600 transition-colors">
            <FaEnvelope className="w-6 h-6" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Good Morning</p>
              <p className="font-semibold text-gray-800">Shine Joshef</p>
            </div>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
            {/* Logout is now implicitly handled, removed the explicit button */}
            {/* You can add a dropdown here for logout if needed later */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
