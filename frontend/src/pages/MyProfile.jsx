import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setIsLoading(false);
    }
  }, [userData]);


  if(isLoading){
    return <p className="text-center mt-10 text-gray-500">user Loading profile...</p>;
  }
  const handleAddressChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  if (!userData || !userData.name) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.image || ''}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300"
        />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            className="text-lg font-medium text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-lg font-medium text-gray-700">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-xl font-semibold text-gray-800 mb-4">Contact Info</p>
        <div className="mb-4">
          <p className="font-medium text-gray-600">Email Id:</p>
          <p className="text-gray-700">{userData.email}</p>
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-600">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{userData.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-600">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-600">Line 1:</label>
                <input
                  value={userData.address?.line1 || ''}
                  onChange={e => handleAddressChange('line1', e.target.value)}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Line 2:</label>
                <input
                  value={userData.address?.line2 || ''}
                  onChange={e => handleAddressChange('line2', e.target.value)}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">{userData.address?.line1}</p>
              <p className="text-gray-700">{userData.address?.line2}</p>
            </div>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-xl font-semibold text-gray-800 mb-4">Basic Info</p>
        <div className="mb-4">
          <p className="font-medium text-gray-600">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-700">{userData.gender}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-600">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`w-full px-4 py-2 text-white font-medium rounded-md ${
            isEdit ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          {isEdit ? 'Save Information' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
