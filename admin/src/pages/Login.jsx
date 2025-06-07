import React, { use, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../../frontend/src/context/Appcontext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate

const Login = () => {
    const [mode, setMode] = useState('Login'); // 'Login' or 'Sign Up'
    const [userType, setUserType] = useState('User'); // 'User', 'Doctor', or 'Admin'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { backendUrl, atoken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let endpoint = '';
    
            // Determine the endpoint based on userType and mode
            if (userType === 'Doctor') {
                endpoint = mode === 'Sign Up' ? '/api/doctors/signup' : '/api/doctors/login';
            } else if (userType === 'Admin') {
                endpoint = mode === 'Sign Up' ? '/api/admin/signup' : '/api/admin/login';
            } else if (userType === 'User') {
                endpoint = mode === 'Sign Up' ? '/api/users/register' : '/api/users/login';
            }
    
            // Prepare the payload
            const payload = mode === 'Sign Up'
                ? { name, email, password }
                : { email, password };
    
            // Send request to backend
            const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);
             console.log(data);
            if (data.success) {
                toast.success(data.message);
    
                // Save token to localStorage and context
                console.log('Backend response:', data); // Debugging log for backend response
                if (data.token) {
                    console.log('Token received:', data.token); // Debugging log for token
                    localStorage.setItem('aToken', data.token); // Store token in localStorage
                    setAToken(data.token); // Update context with token
                } else {
                    console.error('No token received from backend');
                }

                // Redirect to home page after successful login
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Login/Signup Error:', error);
            toast.error(error.response?.data?.message || `${mode} failed`);
        }
    };
    

    useEffect(() => {
        if(atoken) {
            navigate('/');
        }
    }, [atoken]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {userType} {mode}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {mode === 'Sign Up' && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            {mode === 'Login' && (
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {mode}
                        </button>

                        <p className="text-sm text-gray-600 mt-4 text-center">
                            {mode === 'Login' ? "Don't have an account?" : "Already have an account?"}{' '}
                            <span
                                onClick={() => setMode(mode === 'Login' ? 'Sign Up' : 'Login')}
                                className="text-blue-600 cursor-pointer hover:underline font-medium"
                            >
                                {mode === 'Login' ? 'Sign Up' : 'Login'}
                            </span>
                            <br />
                            Switch to {userType === 'Doctor' ? 'Admin' : userType === 'Admin' ? 'Doctor' : 'Doctor/ Admin'}?{' '}
                            <span
                                onClick={() => setUserType(userType === 'Doctor' ? 'Admin' : 'Doctor')}
                                className="text-blue-600 cursor-pointer hover:underline font-medium"
                            >
                                Click here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
