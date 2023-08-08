import React from 'react'
import Layout from '../../components/Layout'
import { useParams  } from 'react-router-dom';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Table } from 'antd';

const PatientPage = () => {
    const [patients,setPatients] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();

  
    const getAllPatientData = async() => {
        try {
            const res = await axios.post('/api/v1/doctor/getAllPatientsData',{
                userId: params.id
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setPatients(res.data.data);
                
              }
        } catch (error) {
            console.log(error);

        }
        
    }

    useEffect(() => {
        getAllPatientData()
    },[])

    const cols = [ //here change the data index to the appointment model schema naming convection 
        {
          title:'Name',
          dataIndex:'',
        },
        {
          title:'Phone',
          dataIndex:''
        },
        {
          title:'User Id',
          dataIndex:'userId'
        },
        {
          title:'History',
          dataIndex:'actions',
          render: (text,record) => (
            <div className='d-flex'>
              <button className='btn btn-success'>View</button>
            </div>
          )
        }
      ]

  return (
    <Layout>
        <div className='search-bar p-3'>
            <h4>searchbar here</h4>
        </div>
        <h2 className='p-3'>List of all patients</h2>
        <Table className='p-4' columns={cols} dataSource={patients}/>
    </Layout>
  )
}

export default PatientPage