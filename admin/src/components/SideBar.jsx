import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets';

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen w-60 bg-white border-r shadow-sm">
      {aToken && (
        <ul className="flex flex-col gap-2 mt-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 font-semibold border-l-4 border-blue-500' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="dashboard" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 font-semibold border-l-4 border-blue-500' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="appointments" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-Doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 font-semibold border-l-4 border-blue-500' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="add doctor" className="w-5 h-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 font-semibold border-l-4 border-blue-500' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="doctors list" className="w-5 h-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
