import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const { token, setToken } = useContext(AppContext);


    const logout = () => {

        setToken(null);
        localStorage.removeItem('token');
      };

    return (
        <div className='flex item-center justify-between text-sm py-4 md-5 border-b border-b-gray-400'>
            <img onClick={()=>navigate('/')} src={assets.razorpay_logo} alt="" srcSet="" className='w-44 cursor-pointer' />
            <ul className='hidden md:flex  gap-5 font-medium items-center'>
                <NavLink to='/'>
                    <li className='py-1 '>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 '>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 '>About</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 '>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex gap-4 center'>
               {
                token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" srcSet="" />
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="" srcSet="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/myprofile')} className='hover:text-black-500 cursor-pointer'>My profile</p>
                            <p onClick={()=>navigate('/my-appointment')} className='hover:text-black-500 cursor-pointer'>My appointment</p>
                            <p onClick={logout} className='hover:text-black-500 cursor-pointer'>logout</p>
                        </div>
                    </div>
                </div>: 
                <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
               }

            </div>
        </div>
    )
}

export default Navbar
