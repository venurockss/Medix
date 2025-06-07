import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'


const DoctorsList = () => {
  const {doctors,aToken,getAllDoctors} = useContext(AdminContext);

  useEffect(() => {
    if(aToken) {
      getAllDoctors()
    }
  }, [aToken])
  return (
    <div className="p-6">
      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
            >
              <img
                src={doctor.image || 'https://via.placeholder.com/150'} // fallback image
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{doctor.name}</h3>
              <p className="text-gray-700"><strong>Specialization:</strong> {doctor.specialization}</p>
              <p className="text-gray-700"><strong>Email:</strong> {doctor.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {doctor.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No doctors found.</p>
      )}
    </div>
  )
}

export default DoctorsList
