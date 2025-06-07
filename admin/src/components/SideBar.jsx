import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ to, icon, label, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-gray-600 transition-colors duration-200 ${
        isActive 
          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
          : 'hover:bg-gray-50 hover:text-blue-600'
      }`
    }
  >
    <span className="inline-flex items-center justify-center w-8 h-8 mr-3">
      {children}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manage your clinic</p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <MenuItem to="/admin-dashboard" label="Dashboard">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </MenuItem>

          <MenuItem to="/all-appointments" label="Appointments">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </MenuItem>

          <MenuItem to="/add-Doctor" label="Add Doctor">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </MenuItem>

          <MenuItem to="/doctor-list" label="Doctors List">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </MenuItem>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold text-lg">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
