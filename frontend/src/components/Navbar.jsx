import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const NavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group ${
        isActive
          ? 'text-primary-600 bg-primary-50'
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform origin-left transition-transform duration-200 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`} />
    </NavLink>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-soft' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition-all duration-200" 
            onClick={() => navigate('/')}
          >
            <img src={assets.medix_logo} alt="MEDIX Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/doctors">Doctors</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-50 transition-colors duration-200 relative"
                  >
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-soft border border-gray-100 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                          <p className="text-sm text-gray-600">Your appointment with Dr. Smith is confirmed</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                        {/* Add more notifications here */}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer p-1.5 rounded-full hover:bg-gray-50 transition-all duration-200">
                    <div className="relative">
                      <img
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100"
                        src={assets.profile_pic}
                        alt="Profile"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                    </div>
                    <svg 
                      className="w-4 h-4 text-gray-600 transition-transform duration-200 group-hover:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Profile Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="py-2 bg-white rounded-xl shadow-soft border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => navigate('/myprofile')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </button>
                        <button
                          onClick={() => navigate('/my-appointment')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          My Appointments
                        </button>
                      </div>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!showMenu ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${showMenu ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
        <NavLink
          to="/"
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            onClick={() => setShowMenu(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            onClick={() => setShowMenu(false)}
        >
            Doctors
        </NavLink>
        <NavLink
          to="/about"
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            onClick={() => setShowMenu(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            onClick={() => setShowMenu(false)}
        >
          Contact
        </NavLink>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;

