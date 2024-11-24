import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col gap-4 items-center py-16 text-grey-800 ' id="speciality">
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {
                    specialityData.map((item, index) => (
                        <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center cursor-pointer text-x5 flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                            <img className='w-16 sm:w-24 md-2' src={item.image} alt={item.speciality} />
                            {/* <p>{item.name}</p> */}
                            <p>{item.speciality}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default SpecialityMenu;
