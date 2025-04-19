import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { AppContext } from '../../../frontend/src/context/Appcontext';

const Navbar = () => {
  const { aToken,setAToken } = useContext(AdminContext);
  const {token,setToken} = useContext(AdminContext)
  const navigate = useNavigate()
  const logout = ()=>{
    setToken(false)
    navigate('/')
    // aToken && setAToken('');
    token && localStorage.removeItem('token');
  }

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={assets.admin_logo} alt="Admin Logo" className="h-10 w-auto" />
        <p className="text-lg font-semibold text-gray-700">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
