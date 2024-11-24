import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  
  // Check if doctors is an array
  if (!doctors) {
    return <div className="text-center text-xl py-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <p className="text-3xl font-semibold text-center pb-6">My Appointments</p>
      <div className="space-y-8">
        {doctors.slice(0, 4).map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200" 
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
                <p className="text-gray-500 mt-2">Address:</p>
                <p className="text-gray-700">{item.address?.line1}</p>
                <p className="text-gray-700">{item.address?.line2}</p>
                <p className="text-gray-500 mt-2">
                  <span className="font-bold">Date and Time:</span> 25, July, 2024 | 8:30 AM
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-all">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-all">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
