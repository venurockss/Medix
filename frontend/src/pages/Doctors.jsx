import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { AppContext } from '../context/Appcontext';
// import { doctors } from '../assets/assets';

const Doctors = () => {

  const {speciality} = useParams();
  const {doctorsList} = useContext(AppContext);
  const [filterDoc,setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctorsList.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctorsList);
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctorsList,speciality])
  
  return (
    <div className=''>
       <p className='text-gray-600 '>Browse through the doctors specialist.</p>
       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <div className='flex flex-col gap-4 text-sm text-gray-600 '>
            <p onClick={()=> speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`} >General physician</p>
            <p onClick={()=> speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`} >Gynecologist</p>
            <p onClick={()=> speciality === "Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`} >Dermatologist</p>
            <p onClick={()=> speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`} >pediatricians</p>
            <p onClick={()=> speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`} >Neurologist</p>
            <p onClick={()=> speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tansition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`} >Gastroenterologist</p>
          </div>


          <div className='w-full grid grid-cols-auto gap-2'>
              {
                filterDoc?.length > 0 ?
                filterDoc.map((item,index)=>(
                  <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer translate-y-[-10px] transition-all duration-500"
                  key={index}>
                      <img className='bg-blue-50 ' src={item.image} alt="" />
                      <div className='p-4'>
                          <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                              <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                          </div>
                          <p className='text-grey-900 text-lg font-medium'>{item.name}</p>
                          <p className='text-grey-600 text-sm'>{item.speciality}</p>
                      </div>
                      </div>
              )):null
              }
          </div>
       </div>
    </div>
  )
}

export default Doctors
