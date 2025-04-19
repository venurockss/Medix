import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Routes,Route } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
 


const App = () => {
  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F*F8FD]' >
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-starts'>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<DashBoard/>}></Route>
          <Route path='/all-appointmennts' element={<AllAppointment/>}></Route>
          <Route path='/add-Doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorsList/>}></Route>



          
        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login/>
     <ToastContainer/>
      
    </>
  )
}

export default App
