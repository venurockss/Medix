import React, { useState ,useContext} from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios' 
import { toast } from 'react-toastify'

const Login = () => {

  const {backendUrl,token,setToken} = useContext(AppContext)


  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
     try {
       

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl+'/api/users/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
           setToken(data.token)
        }
        else{
         toast.error(data.message)
        }
      }

      if(state === 'Login'){
        const {data} = await axios.post(backendUrl+'/api/users/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
           setToken(data.token)
        }
        else{
         toast.error(data.message)
        }
      }


     } catch (error) {
      
     }



  };


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center ' action="">
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
