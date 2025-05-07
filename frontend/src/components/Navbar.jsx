// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/Appcontext'

// const Navbar = () => {

//     const navigate = useNavigate();
//     const [showMenu,setShowMenu] = useState(false);
//     const { token, setToken } = useContext(AppContext);


//     const logout = () => {

//         setToken(null);
//         localStorage.removeItem('token');
//       };

//     return (
//         <div className='flex item-center justify-between text-sm py-4 md-5 border-b border-b-gray-400'>
//             <img onClick={()=>navigate('/')} src={assets.medix_logo} alt="" srcSet="" className='w-44 cursor-pointer' />
//             <ul className='hidden md:flex  gap-5 font-medium items-center'>
//                 <NavLink to='/'>
//                     <li className='py-1 '>Home</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/doctors'>
//                     <li className='py-1 '>All Doctors</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/about'>
//                     <li className='py-1 '>About</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/contact'>
//                     <li className='py-1 '>Contact</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//             </ul>
//             <div className='flex gap-4 center'>
//                {
//                 token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//                     <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" srcSet="" />
//                     <img className='w-2.5 ' src={assets.dropdown_icon} alt="" srcSet="" />
//                     <div className='absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block'>
//                         <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                             <p onClick={()=>navigate('/myprofile')} className='hover:text-black-500 cursor-pointer'>My profile</p>
//                             <p onClick={()=>navigate('/my-appointment')} className='hover:text-black-500 cursor-pointer'>My appointment</p>
//                             <p onClick={logout} className='hover:text-black-500 cursor-pointer'>logout</p>
//                         </div>
//                     </div>
//                 </div>: 
//                 <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//                }

//             </div>
//         </div>
//     )
// }

// export default Navbar


import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm px-4 py-0.5 border-b border-gray-200 flex items-center justify-between backdrop-blur-sm">
      
      {/* Logo */}
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <img src={assets.medix_logo} alt="MEDIX Logo" className="w-36 md:w-35" />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 font-medium text-gray-700 tracking-wide">
        <NavLink
          to="/"
          className="hover:text-primary transition duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className="hover:text-primary transition duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          All Doctors
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-primary transition duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="hover:text-primary transition duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          Contact
        </NavLink>
      </ul>

      {/* Right side (Auth/Profile) */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group cursor-pointer flex items-center gap-2">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 px-4 w-52 hidden group-hover:block z-50">
              <p
                onClick={() => navigate('/myprofile')}
                className="py-2 hover:text-primary cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('/my-appointment')}
                className="py-2 hover:text-primary cursor-pointer"
              >
                My Appointment
              </p>
              <p
                onClick={logout}
                className="py-2 hover:text-primary cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary-dark transition hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

