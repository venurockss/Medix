import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctorsList, currencySymbol ,getDoctors,backendUrl,token} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null);
  // slots states
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetechDocInfo = async () => {
    const docInfo = doctorsList.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }
  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current date
    let today = new Date()

    // for (let i = 0; i < 7; i++) {
    //   // getting date with index
    //   let currentDate = new Date(today)
    //   currentDate.setDate(today.getDate() + i)
    //   //setting and time of the date with index

    //   let endTime = new Date()
    //   endTime.setDate(today.getDate() + i)
    //   endTime.setHours(21, 0, 0, 0)

    //   //setting hourse
    //   if (today.getDate() === currentDate.getDate()) {
    //     currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
    //     currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

    //   }
    //   else {
    //     currentDate.setHours(10)
    //     currentDate.setMinutes(0)

    //   }

    //   let timeSlots = []
    //   while (currentDate < endTime) {
    //     let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    //     let day = currentDate.getDate();
    //     let month = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
    //     let year = currentDate.getFullYear();
    //     const slotDate = `${day}-${month}-${year}`;
    //     //checking if the slot is already booked
    //     const slotTime = formattedTime;
    //     console.log(docInfo.slots_booked[slotDate]);
    //     const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
    //     if (isSlotAvailable) {

    //     //add slots to array
    //     timeSlots.push({
    //       datetime: new Date(currentDate),
    //       time: formattedTime
    //     })
    //     }

    //     //increment current time by 30 min
    //     currentDate.setMinutes(currentDate.getMinutes() + 30);

    //   }

    //   setDocSlots(prev => ([...prev, timeSlots]))
    // }
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
      let slotTime = new Date(baseDate); // make a fresh copy
    
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
    
        slotTime.setMinutes(slotTime.getMinutes() + 30); // only move the slotTime
      }
    
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if(!token){
      toast.warn('Please login to book an appointment')
      return navigate('/login')
    }

    try {
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

  return docInfo && (
    <div className=''>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border w-full border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* doc info name,degree,experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* Doctor About */}
          <div >
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm to-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>


          <p className='mt-4 text-gray-500'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span></p>
        </div>

      </div>


      {/* bOOKINg slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16  rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200 '}`} key={index}>
                <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p  onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          )) }
        </div>

        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

      {/* List of Related Doctors */}
      <RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
