import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token,getDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
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
    }
  }

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const data = await axios.post(`${backendUrl}/api/users/cancel-appointment`, { appointmentId }, {
        headers: {
          Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
        }
      });

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

  // const handlePayment = async (appointmentId) => {
  //   try {
  //     const data = await axios.post(`${backendUrl}/api/users/payment-razorpay`, { appointmentId }, {
  //       headers: {
  //         Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
  //       }
  //     });

  //     if (data.data.success || data.data.sucess) {
  //       toast.success('Payment successful');
  //       await getUserAppointments();
  //     } else {
  //       toast.error(data.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // }



  // Fetch appointments when the component mounts
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  if (!appointments.length) {
    return <div className="text-center text-xl py-6">No Appointments Found.</div>;
  }
  return (

    <div className="max-w-4xl mx-auto py-6">
      <p className="text-3xl font-semibold text-center pb-6">My Appointments</p>

      <div className="space-y-8">
        {appointments.slice(0, 4).map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24">
                <img
                  src={item.doctorData?.image}
                  alt={item.doctorData?.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">{item.doctorData?.name}</p>
                <p className="text-gray-600">{item.doctorData?.speciality}</p>
                <p className="text-gray-500 mt-2">Address:</p>
                <p className="text-gray-700">{item.doctorData?.address?.line1}</p>
                <p className="text-gray-700">{item.doctorData?.address?.line2}</p>
                <p className="text-gray-500 mt-2">
                  <span className="font-bold">Date and Time:</span> {item.slotDate} | {item.slotTime}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              {item.cancelled === false && (
                <>
                  <button onClick={()=> handlePayment(item._id)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-all" >Pay Online</button>
                  <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-all">Cancel Appointment</button>
                </>
              )}
              {item.cancelled === true && (
                <button className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-not-allowed" disabled>Cancelled</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default MyAppointments;
