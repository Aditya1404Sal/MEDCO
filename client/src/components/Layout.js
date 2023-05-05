import React from 'react'
import "../styles/LayoutStyle.css"
import { HeaderMenuAdmin, HeaderMenuUser, SidebarMenu } from '../Data/data'
import {Link,useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {message,Badge} from 'antd'
const Layout = ({children}) => {
  const {user} = useSelector(state => state.user)
  const location = useLocation();
  const navigate = useNavigate();


  const HeaderMenuDoctor = [
    {
        name: 'appointment schedule',
        path: '/doctor/appointments',
        icon: 'fa-solid fa-calendar-days'
    },

    {
        name: 'user history',
        path: `/doctor/PatientLogs/${user?._id}`,
        icon: 'fa-solid fa-user'
    },
    {
        name: 'Profile',
        path: `/doctor/profile/${user?._id}`,
        icon:'fa-solid fa-address-card'
    },
    {
        name: 'Payment Status',
        path: '/doctor/payment-status',
        icon:'fa-sharp fa-solid fa-indian-rupee-sign'
    }


]


const logoutHandler = () => {
   localStorage.clear();
   message.success('log-out successful');
   navigate('/Landing');
}

//rendering header list 
const HeaderMenu = user?.isAdmin 
   ? HeaderMenuAdmin
   :user?.isDoctor
   ? HeaderMenuDoctor
   :HeaderMenuUser;



  return (
    <>
    <div className='main'>
      <div className='layout'>
        <div className='sidebar'>
          <div className='logo'>
            <h6>P.B.R <i class="fa-solid fa-notes-medical"></i></h6>
            <hr/> 
            
            </div>
          <div className='menu'>
            {SidebarMenu.map(menu => {
              const isActive = location.pathname === menu.path
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menu-item`}onClick={logoutHandler}>
                    <i className='fa-solid fa-arrow-right-from-bracket'></i>
                    <Link to='/Landing'>Logout</Link>
                  </div>
          </div>
        </div>
        <div className='content'>
          <div className='header'>
            {HeaderMenu.map(header => {
              const isActive = location.pathname === header.path;
              return(
                <>
                <div className={`header-item ${isActive && "active"}`}>
                  <i className={header.icon}></i>
                  <Link to={header.path}>{header.name}</Link>
                </div>
                </>
              )
            })}
            <div className='header-name' style={{cursor:'pointer'}}>
            <Badge count={user && user.notification.length} onClick={()=>{
              navigate('/notification')
              }}
              >
            <i class="fa-sharp fa-solid fa-bell"></i>
            </Badge>
            <Link to='/Profile'>{user?.name}</Link>
            </div>
          </div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
 </> )
}

export default Layout