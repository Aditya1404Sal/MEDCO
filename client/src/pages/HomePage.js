import React,{useEffect, useState}from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import '../styles/HomepageStyle.css'
import DocInfoCard from '../components/DocInfoCard';
import { Row } from 'antd';

const HomePage = () => {

  const [doctors,setDoctors] = useState([]);

  const getDoctorData = async() => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors',{
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

  useEffect(() => {
    getDoctorData()
  },[])
  return (
    <Layout>
      <body>
	     <main>
        <div>
        <Row>
          {doctors && doctors.map(doctor => (
            <DocInfoCard doctor={doctor}/>
          ))}
        </Row>
        </div>
	      </main>
      </body>
    </Layout>
  )
}

export default HomePage