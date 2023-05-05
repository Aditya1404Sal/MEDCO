import React, { useState , useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import {Table, message} from 'antd'
const Doctors = () => {


  const [doctors,setDoctors] = useState([]);

  const getDoctors = async() => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctorData',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success){
        setDoctors(res.data.data);
      }

    } catch (error) {
      console.log(error)
    }
  };

  const accountStatusHandler = async(record,status) =>{
    try {
      const res = await axios.post('/api/v1/admin/accountStatusChange',
      {doctorId:record._id , userId:record.userId, status: status},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success){
        message.success(res.data.message);
        window.location.reload();
      }

    } catch (error) {
      console.log(error)
      message.error('account change pipeline has error')
    }
}




useEffect(() => {
  getDoctors();
},[]);


const cols = [
  {
    title:'First Name',
    dataIndex:'firstName',
  },
  {
    title:'Last Name',
    dataIndex:'lastName'
  },
  {
    title:'E-mail',
    dataIndex:'email'
  },
  {
    title:'Mobile.No',
    dataIndex:'phone'
  },
  {
    title:'Actions',
    dataIndex:'actions',
    render: (text,record) => (
      <div className='d-flex'>
        {record.status === 'pending' ? <button className='btn btn-success' onClick={() => accountStatusHandler(record,"approved")}>Approve</button> : <button className='btn btn-danger' onClick={() =>accountStatusHandler(record,'pending')}>Reject</button>}
      </div>//changes are made above
    )
  }
]





  return (
    <Layout>
      <h3>List of all verified Doctors using website as a platform</h3>
      <Table columns={cols} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors