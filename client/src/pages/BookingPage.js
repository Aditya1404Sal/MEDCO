import React from 'react'
import Layout from '../components/Layout'
import { useParams  } from 'react-router-dom';
import axios from 'axios'
import {useEffect,useState} from 'react'
import { DatePicker, Form, TimePicker, message } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {showLoading,hideLoading} from '../redux/features/alertSlice' 

const BookingPage = () => {
    const [doctors,setDoctors] = useState([]);
    const params = useParams();
    const {user} = useSelector(state => state.user)
    const [date,setDate] = useState([]);
    const [time,setTime] = useState();
    const [isAvailable,setisAvailable] = useState();
    const dispatch = useDispatch();

  const getDoctorData = async() => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorById',{ doctorId: params.doctorId },{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      if(res.data.success){
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  //======================================

  const handleBooking = async() => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment',
      {
        doctorId:params.doctorId,
        userId:user._id,
        appointmentDate:date.format('DD-MM-YYYY'),
        appointmentTime:time.format("HH:mm"),
        doctorInfo:doctors,
        userInfo:user
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }
    } catch (error) {
      
    }
  }

  const handleAvailability =async() => {
    try {
      dispatch(showLoading()); 
      const res = await axios.post('/api/v1/user/checkAppointmentAvailable',
      {doctorId:params.doctorId, date, time},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setisAvailable(true)
        message.success(res.data.message)
        dispatch(hideLoading());
      }else{
        message.error(res.data.message)
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }


  //======================================

  useEffect(() => {
    getDoctorData()
  },[])
  return (
    <Layout>
        <h1 className='m-2 p-3'>BookingPage</h1>
        <div className='container'>
            {doctors && (
                <h3>Dr.{doctors.firstName} {doctors.lastName}</h3>
            )}
        </div>
        <div className='docdetails p-3 df'>
        <div className='mapSection m-3 p-2'>
          <p>personal hospital address:</p>
        </div>
        <div className='testimonySection m-3 p-2'>
          <p>review:/rating</p>
        </div>
        <div className='pricingSection m-3 p-2'>
          <p>Appointment Type:</p>
          <form>
            <label>Normal Check-Up</label>
            <input type='radio' onSelect={manageAPPtype1}/>
            <label>Premium Check-Up</label>
            <input type='radio' onSelect={manageAPPtype2}/>
            <label>Consultation</label>
            <input type='radio' onSelect={manageCONtype1}/>
            <label>Special Consultation</label>
            <input type='radio' onSelect={manageCONtype2}/>
          </form>
        </div>
        </div>
        <div className='HistoryFillingForm'>
          <Form>


          </Form>
        <div className='Form d-flex flex-column w-55 m-3'>
          <DatePicker
          className='m-3'
          format="DD-MM-YYYY"
          onChange={(inputdate) =>{
            setDate(inputdate) 
        }
        }
          />
          <TimePicker
          className='m-3'
          format="HH:mm"
          onChange={(inputtime) => {
            setTime(inputtime)}
          }
          />
        </div>
        </div>
        <button className='btn btn-primary m-3 mt-2' onClick={handleAvailability}>
            Check Availability
        </button>
          <button className='btn btn-dark m-3 mt-2' onClick={handleBooking}>
          Proceed to Booking
        </button>
        
    </Layout>
  )
}

export default BookingPage