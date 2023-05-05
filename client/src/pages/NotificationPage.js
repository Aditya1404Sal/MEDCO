import React from 'react'
import Layout from '../components/Layout'
import { Tabs,message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NotificationPage = () => {


    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const markAllReadHandler = async() =>{
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            )
           window.location.reload();
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error('res.data.message');
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('something went wrong')

        }
    };

    const markAllUnReadHandler =async() =>{
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            )
           window.location.reload();
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error('res.data.message');
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('something went wrong')

        }
    };

  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab='Un-Read' key={0}>
                <div className='d-flex justify-content-end' style={{cursor:'pointer'}}>
                    <h4 className='p-3' onClick={markAllReadHandler}>Mark all read</h4>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className='card' onClick={() => {navigate(notificationMsg.onClickPath)}} style={{cursor:'pointer'}}>
                            <div className='card-text'>
                                {notificationMsg.message}
                            </div>
                        </div> 
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className='d-flex justify-content-end' style={{cursor:'pointer'}}>
                    <h4 className='p-3' onClick={markAllUnReadHandler}>Delete all read</h4>
                </div>
                {
                    user?.seenNotification.map(SeennotificationMsg => (
                        <div className='card' onClick={() => {navigate(SeennotificationMsg.onClickPath)}} style={{cursor:'pointer'}}>
                            <div className='card-text'>
                                {SeennotificationMsg.message}
                            </div>
                        </div> 
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage