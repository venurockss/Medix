import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to home page after login
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let endpoint = '';

      if (state === 'Sign Up') {
        endpoint = '/api/users/register';
      } else if (state === 'Login') {
        endpoint = '/api/users/login';
      }

      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success || data.sucess) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        setToken(data.token); // Update context with token
        toast.success(data.message);
    
        // Give the context a short time to update before navigating
        setTimeout(() => {
            navigate('/');
        }, 200);
    } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl border text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold '>{state === 'Sign Up' ? "create Account" : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : 'log in'} to book appointment</p>
        {
          state === 'Sign Up' && <div className='w-full '>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full '>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type="submit" className='bg-primary  text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "create Account" : 'Login'}</button>

        {
          state === "Sign Up" ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            :
            <p>create a new Account ? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>

    </form>
  )
}

export default Login
