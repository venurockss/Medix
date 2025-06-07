import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentStatus = ({ status }) => {
  const statusStyles = {
    upcoming: 'bg-primary-100 text-primary-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-green-100 text-green-700',
  };

  const statusText = {
    upcoming: 'Upcoming',
    cancelled: 'Cancelled',
    completed: 'Completed',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${status === 'upcoming' ? 'bg-primary-500' : status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`} />
      {statusText[status]}
    </span>
  );
};

const AppointmentCard = ({ appointment, onCancel }) => {
  const getAppointmentStatus = () => {
    if (appointment.cancelled) return 'cancelled';
    const appointmentDate = new Date(appointment.slotDate);
    const today = new Date();
    return appointmentDate < today ? 'completed' : 'upcoming';
  };

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-soft transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <img
              src={appointment.doctorData?.image}
              alt={appointment.doctorData?.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-sm"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                Dr. {appointment.doctorData?.name}
              </h3>
              <AppointmentStatus status={getAppointmentStatus()} />
            </div>
            
            <p className="text-primary-600 font-medium mb-2">
              {appointment.doctorData?.speciality}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{appointment.slotDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{appointment.slotTime}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-900">{appointment.doctorData?.address?.line1}</p>
                  <p className="text-gray-600">{appointment.doctorData?.address?.line2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!appointment.cancelled && getAppointmentStatus() === 'upcoming' && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onCancel(appointment._id)}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Appointment
            </button>
            {/* Uncomment when payment feature is ready */}
            {/* <button
              onClick={() => handlePayment(appointment._id)}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Pay Now
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

const MyAppointments = () => {
  const { backendUrl, token, getDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed', 'cancelled'

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${backendUrl}/api/users/appointment`, {
        headers: {
          Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
        }
      });

      if (data.data.success || data.data.sucess) {
        setAppointments(data.data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const data = await axios.post(
        `${backendUrl}/api/users/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
          }
        }
      );

      if (data.data.success || data.data.sucess) {
        toast.success('Appointment cancelled successfully');
        await getUserAppointments();
        getDoctors();
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'cancelled') return appointment.cancelled;
    
    const appointmentDate = new Date(appointment.slotDate);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return !appointment.cancelled && appointmentDate >= today;
    }
    if (filter === 'completed') {
      return !appointment.cancelled && appointmentDate < today;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          My Appointments
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          View and manage all your appointments in one place
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by booking your first appointment.</p>
        </div>
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['all', 'upcoming', 'completed', 'cancelled'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors duration-200 ${
                  filter === filterOption
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={cancelAppointment}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointments;
