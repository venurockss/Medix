import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';

const ProfileField = ({ label, value, isEditing, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
    {isEditing ? children : (
      <p className="text-gray-800 bg-gray-50 rounded-lg p-3 border border-gray-100">
        {value || 'Not provided'}
      </p>
    )}
  </div>
);

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleAddressChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEdit(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!userData || !userData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-primary-600 to-primary-400">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={userData.image || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEdit && (
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Name Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                )}
                <p className="text-sm text-gray-500 mt-1">Member since {new Date().getFullYear()}</p>
              </div>
              <button
                onClick={() => isEdit ? handleSave() : setIsEdit(true)}
                disabled={isSaving}
                className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isEdit
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSaving && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isEdit ? (isSaving ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
              </button>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="Email Address" value={userData.email}>
                    <input
                      type="email"
                      value={userData.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed"
                    />
                  </ProfileField>

                  <ProfileField label="Phone Number" value={userData.phone}>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </ProfileField>
                </div>
              </section>

              {/* Address Information */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Address</h2>
                <div className="space-y-4">
                  <ProfileField label="Address Line 1" value={userData.address?.line1}>
                    <input
                      type="text"
                      value={userData.address?.line1 || ''}
                      onChange={e => handleAddressChange('line1', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter address line 1"
                    />
                  </ProfileField>

                  <ProfileField label="Address Line 2" value={userData.address?.line2}>
                    <input
                      type="text"
                      value={userData.address?.line2 || ''}
                      onChange={e => handleAddressChange('line2', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter address line 2 (optional)"
                    />
                  </ProfileField>
                </div>
              </section>

              {/* Personal Information */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="Gender" value={userData.gender}>
                    <select
                      value={userData.gender}
                      onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </ProfileField>

                  <ProfileField label="Date of Birth" value={userData.dob}>
                    <input
                      type="date"
                      value={userData.dob}
                      onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </ProfileField>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
