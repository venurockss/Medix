import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-700 font-medium text-base group ${
        isActive
          ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 shadow-md'
          : 'hover:bg-purple-50 hover:text-purple-700'
      }`
    }
  >
    <span className="inline-flex items-center justify-center w-8 h-8 text-xl">
      {icon}
    </span>
    <span>{label}</span>
  </NavLink>
);

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null;

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-100 shadow-lg flex flex-col rounded-tr-3xl rounded-br-3xl">
      <div className="flex flex-col h-full">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-2xl font-bold text-purple-700 tracking-tight">Medix</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="text-xs text-gray-400 uppercase mb-2 mt-4 tracking-wider">Main</div>
          <MenuItem to="/admin-dashboard" label="Overview" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          } />
          <MenuItem to="/all-appointments" label="Appointment" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          } />
        
          <div className="text-xs text-gray-400 uppercase mb-2 mt-6 tracking-wider">Doctors</div>
          <MenuItem to="/add-Doctor" label="Add Doctor" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          } />
          <MenuItem to="/doctor-list" label="Doctors List" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          } />

          {/* Add more sections as needed, e.g. Patients, Payments, Records, etc. */}
        </nav>

        {/* User Info */}
        <div className="mt-auto px-6 py-6 bg-purple-50 rounded-bl-3xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
            A
          </div>
          <div>
            <div className="font-semibold text-gray-800">Admin User</div>
            <div className="text-xs text-green-500">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
