import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const InputField = ({ label, type, value, onChange, required, icon }) => (
  <div className="w-full space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  </div>
);

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = state === 'Sign Up' ? '/api/users/register' : '/api/users/login';
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };
      
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success || data.sucess) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(data.message);
        setTimeout(() => {
          navigate('/');
        }, 200);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src={assets.medix_logo}
            alt="Medix Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {state === 'Sign Up' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {state === 'Sign Up' 
              ? 'Sign up to start booking appointments with top doctors' 
              : 'Sign in to manage your appointments and healthcare needs'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-card space-y-6">
            {state === 'Sign Up' && (
              <InputField
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
            )}

            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                state === 'Sign Up' ? 'Create Account' : 'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {state === 'Sign Up' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setState('Login')}
                    className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setState('Sign Up')}
                    className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
