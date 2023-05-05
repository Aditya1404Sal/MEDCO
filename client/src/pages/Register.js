import React from 'react';
import {Form, message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';
import '../styles/RegisterStyle.css';
import axios from 'axios'
import {Link , useNavigate} from 'react-router-dom'

//form handler

// const OnFinishHandler = async (values) => {
//   try {
//     const res = await axios.post('/api/v1/user/Register' , values)
//     if(res.data.success){
//       message.success('Registered Successfully');
//       navigate("/Login");
//     }else{
//       message.error(res.data.message);
//     }
//   } catch (error) {
//     console.log(error);
//     message.error('Something went wrong');
//   }
// }

const Register = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/Register' , values)
      dispatch(hideLoading());
      if(res.data.success){
        message.success('Registered Successfully');
        navigate("/Login");
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  }

const redirection = () => {
  navigate('/Login');
}


  return (
<div className='form-container'>
  <Form layout='vertical' onFinish={OnFinishHandler} className="Register-form p-4">
    <h1>Register Form</h1>
    <FormItem label="Name*" name="name" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Email*" name="email" >
      <Input type='email' required/>
    </FormItem>
    <FormItem label="Password*" name="password" >
      <Input type='password' required/>
    </FormItem>
    <FormItem label="Mobile Number*" name="mobile" >
      <Input type='text' pattern="[0-9]{10}" required/>
    </FormItem>
    <button className='btn btn-primary' type='submit'>Register</button>
    <hr/>
    <button className='btn btn-primary' onClick={redirection}>Existing User ?</button>
  </Form>
</div>

  )
}

export default Register