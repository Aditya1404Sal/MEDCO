import React from 'react';
import Layout from '../components/Layout'
import {Form , Input , Row,Col,TimePicker, message} from 'antd';
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment';

const ApplyDoctor = () => {

  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async(values) =>{
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/apply-doctor',{...values, userId:user._id,
        timings:[
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm")
      ]},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success){
        navigate('/')
      }else{
        message.error(res.data.success)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong')
    }
  }

  return (
    <Layout>
      <h1 className='text-center font-size bold'>Apply as a Doctor </h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
      <h3>Personal Details:</h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="First name" 
          name="firstName" 
          required 
          rules={[{required:true}]}>
            <Input type='text' placeholder='your first name'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Last name" 
          name="lastName" 
          required 
          rules={[{required:true}]}>
            <Input type='text' placeholder='your last name'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item label="Phone" name="phone" required rules={[{required:true}]}>
            <Input type='number' placeholder='your phone number'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="E-mail" 
          name="email" 
          required 
          rules={[{required:true}]}>
            <Input type='email' placeholder='your email'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Website" 
          name="website">
            <Input type='text' placeholder='your website (optional)'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Address" 
          name="address" 
          required 
          rules={[{required:true}]}>
            <Input type='text' placeholder='your address'/>
          </Form.Item>
          </Col>
        </Row>
        <h3>Professional Details:</h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Specialisation" 
          name="specialization" 
          required 
          rules={[{required:true}]}>
            <Input type='text' placeholder='your specialisation'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Experience" 
          name="experience" 
          required 
          rules={[{required:true}]}>
            <Input type='text' placeholder='your experience'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Fee" 
          name="consultationFee" 
          required 
          rules={[{required:true}]}>
            <Input type='number' placeholder='consultation charges per session'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item 
          label="Timings" 
          name="timings" 
          required 
          rules={[{required:true}]}>
          <TimePicker.RangePicker format='HH:mm'/>
          </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
          <button className='btn btn-primary form-btn' type='submit'>
            Submit
          </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor