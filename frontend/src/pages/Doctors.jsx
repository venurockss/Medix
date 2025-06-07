import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const SpecialtyButton = ({ name, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full sm:w-auto px-6 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 text-primary-700 border-primary-200'
        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
    } border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
  >
    <span className="relative z-10">{name}</span>
    {isActive && (
      <span className="absolute inset-0 bg-primary-100/50 rounded-xl transform scale-105 transition-transform duration-200" />
    )}
  </button>
);

const DoctorCard = ({ doctor, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
  >
    <div className="aspect-w-3 aspect-h-4 bg-gray-100 relative overflow-hidden">
      <img
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        src={doctor.image}
        alt={doctor.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        Dr. {doctor.name}
      </h3>
      <p className="text-gray-600 mb-4">{doctor.speciality}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">4.8</span>
        </div>
        <span className="inline-flex items-center text-sm font-medium text-primary-600">
          View Profile
          <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </div>
);

const Doctors = () => {
  const { speciality } = useParams();
  const { doctorsList } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctorsList.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctorsList);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctorsList, speciality]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Your Specialist
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse through our network of trusted medical specialists and book your appointment today
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Specialty Filter */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h2>
              <div className="space-y-2">
                {specialties.map((name) => (
                  <SpecialtyButton
                    key={name}
                    name={name}
                    isActive={speciality === name}
                    onClick={() => 
                      speciality === name 
                        ? navigate('/doctors')
                        : navigate(`/doctors/${name}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="flex-1">
            {filterDoc?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterDoc.map((doctor, index) => (
                  <DoctorCard
                    key={doctor._id || index}
                    doctor={doctor}
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                  />
                ))}
                          </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your specialty filter or check back later.
                </p>
                      </div>
            )}
          </div>
          </div>
       </div>
    </div>
  );
};

export default Doctors;
