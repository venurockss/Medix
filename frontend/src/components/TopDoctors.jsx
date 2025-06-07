import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext';

const DoctorCard = ({ doctor, onClick }) => (
  <div
    onClick={onClick}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="aspect-w-3 aspect-h-4 bg-gray-100">
      <img
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        src={doctor.image}
        alt={doctor.name}
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-green-600">Available Now</span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
        {doctor.name}
      </h3>
      <p className="text-gray-600">{doctor.speciality}</p>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">4.8</span>
          </div>
          <span className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700">
            View Profile
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
);

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctorsList} =useContext(AppContext)
    console.log("Doctors List in TopDoctors:", doctorsList); 
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Doctors
          </h2>
          <p className="text-lg text-gray-600">
            Connect with our highly qualified and experienced medical professionals for the best healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {doctorsList.slice(0, 8).map((doctor, index) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              navigate('/doctors');
              scrollTo(0, 0);
            }}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            View All Doctors
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopDoctors
