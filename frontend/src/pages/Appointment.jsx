import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = ({ docInfo, currencySymbol }) => (
  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-64 w-full md:w-64 object-cover"
          src={docInfo.image}
          alt={docInfo.name}
        />
      </div>
      <div className="p-8">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-900">{docInfo.name}</h2>
          <img className="w-6 h-6 ml-2" src={assets.verified_icon} alt="Verified" />
        </div>
        
        <div className="mt-2 flex items-center flex-wrap gap-2">
          <span className="text-primary-600 font-medium">{docInfo.speciality}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{docInfo.degree}</span>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {docInfo.experience}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            About
            <img src={assets.info_icon} alt="Info" className="w-5 h-5 ml-2" />
          </h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{docInfo.about}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Consultation Fee</p>
            <p className="text-2xl font-bold text-primary-600">{currencySymbol}{docInfo.fee}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-600">4.8</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-sm text-gray-600">500+ consultations</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DateSelector = ({ docSlots, slotIndex, setSlotIndex, daysOfWeek }) => (
  <div className="flex gap-3 items-center overflow-x-auto pb-4 scrollbar-hide">
    {docSlots.map((daySlots, index) => (
      <button
        key={index}
        onClick={() => setSlotIndex(index)}
        className={`flex flex-col items-center justify-center p-4 min-w-[100px] rounded-xl transition-all duration-200 ${
          slotIndex === index
            ? 'bg-primary-600 text-white shadow-lg transform scale-105'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <span className="text-sm font-medium">
          {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
        </span>
        <span className={`text-2xl font-bold ${slotIndex === index ? 'text-white' : 'text-gray-900'}`}>
          {daySlots[0] && daySlots[0].datetime.getDate()}
        </span>
      </button>
    ))}
  </div>
);

const TimeSlots = ({ slots, selectedTime, onTimeSelect }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
    {slots.map((slot, index) => (
      <button
        key={index}
        onClick={() => onTimeSelect(slot.time)}
        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          slot.time === selectedTime
            ? 'bg-primary-600 text-white shadow-md transform scale-105'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        {slot.time.toLowerCase()}
      </button>
    ))}
  </div>
);

const Appointment = () => {
  const { docId } = useParams()
  const { doctorsList, currencySymbol ,getDoctors,backendUrl,token} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null);
  // slots states
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetechDocInfo = async () => {
    const docInfo = doctorsList.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }
  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let baseDate = new Date(today)
      baseDate.setDate(today.getDate() + i)
    
      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)
    
      if (today.getDate() === baseDate.getDate()) {
        baseDate.setHours(baseDate.getHours() > 10 ? baseDate.getHours() + 1 : 10)
        baseDate.setMinutes(baseDate.getMinutes() > 30 ? 30 : 0)
      } else {
        baseDate.setHours(10)
        baseDate.setMinutes(0)
      }
    
      let timeSlots = []
      let slotTime = new Date(baseDate);
    
      while (slotTime < endTime) {
        let formattedTime = slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
        let day = slotTime.getDate();
        let month = slotTime.getMonth() + 1;
        let year = slotTime.getFullYear();
        const slotDate = `${day}-${month}-${year}`;
   
    
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;
    
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedTime
          });
        }
    
        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }
    
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if(!token){
      toast.warn('Please login to book an appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }

    try {
      setIsLoading(true);
      if(docSlots[slotIndex].length === 0){
        toast.error("No slots available for today. Please select another day.");
        return;
      }
        const date = docSlots[slotIndex][0].datetime;
        let day = date.getDate();
        let month = date.getMonth()+1; // Months are zero-based in JavaScript
        let year = date.getFullYear();

        const slotDate = `${day}-${month}-${year}`;
        const {data} = await axios.post(`${backendUrl}/api/users/book-appointment`,{docId,slotDate,slotTime} ,{
          headers:{
            Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
          }
        })
        if(data.success || data.sucess){
          toast.success('Appointment booked successfully');
          getDoctors()
          navigate('/my-appointment')
        }
        else{
          toast.error(data.message);
        }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);


  useEffect(() => {
    fetechDocInfo()
  }, [doctorsList, docId])

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DoctorProfile docInfo={docInfo} currencySymbol={currencySymbol} />

        <div className="bg-white rounded-2xl shadow-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Appointment Time</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Dates</h3>
              <DateSelector
                docSlots={docSlots}
                slotIndex={slotIndex}
                setSlotIndex={setSlotIndex}
                daysOfWeek={daysOfWeek}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Time Slots</h3>
              <TimeSlots
                slots={docSlots[slotIndex] || []}
                selectedTime={slotTime}
                onTimeSelect={setSlotTime}
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Selected Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {slotTime || 'No time selected'}
                </p>
              </div>
              <button
                onClick={bookAppointment}
                disabled={isLoading || !slotTime}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>

        <RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>
      </div>
    </div>
  )
}

export default Appointment
