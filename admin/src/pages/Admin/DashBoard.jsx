import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashBoard = () => {
  const [dashdata, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { aToken, backendUrl } = useContext(AdminContext);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        { headers: { atoken: aToken } }
      );
      if (data.success || data.sucess) {
        setDashData(data.doctorsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">Loading Dashboard...</div>
      </div>
    );
  }

  if (!dashdata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">No Dashboard Data Found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Doctors</h2>
          <p className="text-3xl mt-2">{dashdata.totalDoctors}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{dashdata.totalUsers}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Appointments</h2>
          <p className="text-3xl mt-2">{dashdata.totalAppointments}</p>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Latest Appointments</h2>

        {dashdata.latestAppointments && dashdata.latestAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">Patient Name</th>
                  <th className="py-2 px-4">Doctor Name</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashdata.latestAppointments.map((appointment, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">
                      {appointment.userData?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {appointment.doctorData?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {appointment.slotDate || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {appointment.slotTime || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {appointment.isCompleted ? "Completed" : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recent appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
