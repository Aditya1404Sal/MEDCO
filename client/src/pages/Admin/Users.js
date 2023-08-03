import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import {Table} from 'antd'

const Users = () => {

  const [users,setUsers] = useState([])

  const getUsers = async() => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUserData',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success){
        setUsers(res.data.data);
      }

    } catch (error) {
      console.log(error)
    }
  }


  const blockUserhandler = async() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
  getUsers();
},[]);

const cols = [
  {
    title:'Name',
    dataIndex:'name',
  },
  {
    title:'E-mail',
    dataIndex:'email'
  },
  {
    title:'Mobile.No',
    dataIndex:'mobile'
  },
  {
    title:'Actions',
    dataIndex:'actions',
    render: (text,record) => (
      <div className='d-flex'>
        <button className='btn btn-danger' onClick={blockUserhandler}>Block</button> //make appropriate changes by lookking at Doctors.js code
      </div>
    )
  }
]

  return (
    <Layout>
      <h3>List of all current users</h3>
      <Table columns={cols} dataSource={users}/>
    </Layout>
  )
}

export default Users