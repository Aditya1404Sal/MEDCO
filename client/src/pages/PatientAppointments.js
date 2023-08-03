import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
import '../styles/AppointmentUser.css'
const moment = require('moment')



const PatientAppointments = () => {
  const [appointments,setAppointments] = useState([]);

  
  const handlePayment = async() => { //in progress
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  const getAppointments = async() => {
    try {
      const res = await axios.get('/api/v1/user/getUserAppointments',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    if(res.data.success){
      setAppointments(res.data.data);
    }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments();
  },[]);
    
    const cols = [ //here change the data index to the appointment model schema naming convection 
    {
      title:'Doctor',
      dataIndex: ['doctorInfo', 'firstName'],
    render: (text, record) => {<span>{record.doctorInfo.firstName}</span>},
    },
    {
      title: 'Date',
      dataIndex: 'appointmentDate',
      render: (text, record) => <span>{moment(record.appointmentDate).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'appointmentTime',
      render: (text, record) => <span>{moment(record.appointmentTime).format('hh:mm')}</span>,
    },
    {
      title:'PaymentStatus',
      dataIndex:'actions',
      render: (text,record) => (
        <div className='d-flex'>
          <button className='btn btn-success' onClick={handlePayment}>Pay-now</button>
        </div>
      )
    }
  ]

return (
<Layout>
    <h1 className='p-3'>List of all appointments</h1>
    <Table className=' table-with-data p-4' columns={cols} dataSource={appointments}/>
</Layout>
)
}


export default PatientAppointments