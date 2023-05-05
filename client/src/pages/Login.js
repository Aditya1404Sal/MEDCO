import React from 'react'
import {Form,message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';
import '../styles/LoginStyle.css';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
// form handler
  const OnFinishHandler = async(values) => {
   try {
    dispatch(showLoading());
    const res = await axios.post('/api/v1/user/Login', values);
    window.location.reload();
    dispatch(hideLoading());
    if(res.data.success){
      localStorage.setItem('token',res.data.token);
      message.success('Logged in successfully')
      navigate('/')
    }else{
      message.error(res.data.message);
    }
   } catch (error) {
    dispatch(hideLoading());
    console.log(error)
    message.error('login went wrong')
   }

  }

  const redirection = () => {
    navigate('/Register');
  }


  return (

 <div className='lord'>
    <div className='my-container'>
      <Form layout='vertical' onFinish={OnFinishHandler} className="Login-form p-4 rounded">
        <h1>Login Form</h1>
        <FormItem label="Email*" name="email" >
          <Input type='email' required/>
        </FormItem>
        <FormItem label="Password*" name="password" >
          <Input type='password' required/>
        </FormItem>
        <button className='btn btn-primary' type='submit'>Login</button>
        <hr/>
        <button className='btn btn-primary' onClick={redirection}>New User ?</button>
      </Form>
    </div>
</div>
  )

}

export default Login