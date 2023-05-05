import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
import '../styles/AppointmentUser.css'


const PatientAppointments = () => {
  const [appointments,setAppointments] = useState([]);
  


  const getAppointments = async() => {
    try {
      
      const res = await axios.post('/api/v1/user/getUserAppointments',null,{
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
      title:'Name',
      dataIndex:'userInfo.name',
    },
    {
      title:'Date',
      dataIndex:'appointmentDate'
    },
    {
      title:'Time',
      dataIndex:'appointmentTime'
    },
    {
      title:'History',
      dataIndex:'actions',
      render: (text,record) => (
        <div className='d-flex'>
          <button className='btn btn-success'>Pay-now</button>
        </div>
      )
    }
  ]

return (
<Layout>
    <div className='search-bar p-3'>
        <h4></h4>
    </div>
    <h2 className='p-3'>List of all appointments</h2>
    <Table className=' table-with-data p-4' columns={cols} dataSource={appointments}/>
</Layout>
)
}


export default PatientAppointments