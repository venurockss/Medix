

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointment = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          atoken: aToken,
        },
      });
      if (response.data.success || response.data.sucess) {
        setAppointments(response.data.appointments);
      } else {
        toast.error('Failed to fetch appointments.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('An error occurred while fetching appointments.');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/appointment-cancel`,
        { appointmentId },
        {
          headers: {
            atoken: aToken,
          },
        }
      );
      if (response.data.success || response.data.sucess) {
        toast.success('Appointment cancelled successfully.');
        fetchAppointments(); // Refresh the appointments list
      } else {
        toast.error('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('An error occurred while cancelling the appointment.');
    }
  }

  useEffect(() => {
    if (aToken) {
      fetchAppointments();
    }
  }, [aToken]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-2xl text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Fees (₹)</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-all">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>

                  <td className="py-4 px-6 text-sm font-medium text-gray-800">
                    {appointment.userData?.name || 'N/A'}
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-600">
                    {appointment.userData?.dob ? calculateAge(appointment.userData.dob) : 'N/A'}
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-600">
                    {appointment.slotDate} - {appointment.slotTime}
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-600">
                    {appointment.doctorData?.name || 'N/A'}
                  </td>

                  <td className="py-4 px-6 text-sm text-gray-600">
                    ₹{appointment.amount}
                  </td>

                  <td className="py-4 px-6 text-center space-x-2">
                    
                    {appointment.cancelled ? (
                      <span className="text-red-500 text-xs font-semibold">Cancelled</span>
                    ) : (
                      <button onClick={()=>cancelAppointment(appointment._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-full">
                        Cancel
                      </button>
                    )}
                    <button onClick={() => handleViewDetails(appointment)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Appointment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
              <div>
                <p className="font-semibold">Patient Name:</p>
                <p>{selectedAppointment.userData?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Patient Email:</p>
                <p>{selectedAppointment.userData?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Patient Age:</p>
                <p>{selectedAppointment.userData?.dob ? calculateAge(selectedAppointment.userData.dob) : 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Doctor Name:</p>
                <p>{selectedAppointment.doctorData?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Doctor Speciality:</p>
                <p>{selectedAppointment.doctorData?.speciality || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Appointment Date:</p>
                <p>{selectedAppointment.slotDate}</p>
              </div>
              <div>
                <p className="font-semibold">Appointment Time:</p>
                <p>{selectedAppointment.slotTime}</p>
              </div>
              <div>
                <p className="font-semibold">Appointment Type:</p>
                <p>{selectedAppointment.type || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Fees:</p>
                <p>₹{selectedAppointment.amount}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p className={`font-semibold ${selectedAppointment.cancelled ? 'text-red-500' : 'text-green-600'}`}>
                  {selectedAppointment.cancelled ? 'Cancelled' : 'Ongoing'}
                </p>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointment;
