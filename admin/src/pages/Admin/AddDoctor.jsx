import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/Admincontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // Store the selected file
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docPassword, setDocPassword] = useState('');
  const [docExperience, setDocExperience] = useState(1);
  const [docFees, setDocFees] = useState('');
  const [docSpeciality, setDocSpeciality] = useState('General physician');
  const [docEducation, setDocEducation] = useState('');
  const [docAddress1, setDocAddress1] = useState('');
  const [docAddress2, setDocAddress2] = useState('');
  const [docAbout, setDocAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docImg) {
      return toast.error("Please upload a doctor image"); // Ensure image is uploaded
    }

    try {
      const formData = new FormData();
      formData.append('image', docImg); // Append the image file
      formData.append('name', docName);
      formData.append('email', docEmail);
      formData.append('password', docPassword);
      formData.append('experience', docExperience);
      formData.append('fee', Number(docFees));
      formData.append('speciality', docSpeciality);
      formData.append('degree', docEducation);
      formData.append('address', JSON.stringify({ line1: docAddress1, line2: docAddress2 })); // Properly stringify the address object
      formData.append('about', docAbout);

      const { data } = await axios.post(`${backendUrl}/api/admin/addDoctor`, formData, {
        headers: {
          atoken: aToken // Use 'atoken' header instead of 'Authorization'
        }
      });

      if (data.status === true) {
        toast.success(data.message);
        setDocName('');
        setDocEmail('');
        setDocPassword('');
        setDocExperience(1);
        setDocFees('');
        setDocSpeciality('General physician');
        setDocEducation('');
        setDocAddress1('');
        setDocAddress2('');
        setDocAbout('');
        setDocImg(null); // Reset image state after successful form submission
      } else if (data.status === 'error') {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding the doctor.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>

        {/* Upload Doctor Picture */}
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-28 h-28 object-contain"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-500">Upload Doctor's Picture</p>
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Doctor Name</label>
            <input onChange={(e) => setDocName(e.target.value)}
              value={docName}
              type="text"
              placeholder="Enter name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Doctor Email</label>
            <input onChange={(e) => setDocEmail(e.target.value)}
              value={docEmail}
              type="email"
              placeholder="Enter email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input onChange={(e) => setDocPassword(e.target.value)}
              value={docPassword}
              type="password"
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience (in years)</label>
            <input onChange={(e) => setDocExperience(e.target.value)}
              value={docExperience}
              type="number"
              placeholder="e.g. 5"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fees (in ₹)</label>
            <input onChange={(e) => setDocFees(e.target.value)}
              value={docFees}
              type="number"
              placeholder="e.g. 1000"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Speciality</label>
            <input onChange={(e) => setDocSpeciality(e.target.value)}
              value={docSpeciality}
              type="text"
              placeholder="e.g. Cardiologist"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <input onChange={(e) => setDocEducation(e.target.value)}
              value={docEducation}
              type="text"
              placeholder="e.g. MBBS, MD"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address Line 1</label>
            <input onChange={(e) => setDocAddress1(e.target.value)}
              value={docAddress1}
              type="text"
              placeholder="e.g. Street, Area"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address Line 2</label>
            <input onChange={(e) => setDocAddress2(e.target.value)}
              value={docAddress2}
              type="text"
              placeholder="e.g. City, Pincode"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* About Me */}
        <div>
          <label className="block text-sm font-medium mb-1">About Me</label>
          <textarea onChange={(e) => setDocAbout(e.target.value)}
            value={docAbout}
            rows="4"
            placeholder="Write about the doctor..."
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
