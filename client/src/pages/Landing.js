import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LandingStyle.css'
import {Col,Row} from 'antd'

const Landing = () => {
    const navigate = useNavigate();

    const NavToLogin = async() => {
        try {
            navigate('/Login')
        } catch (error) {
            console.log(error)
        }
    }

    const NavToRegister = () => {
        try {
            navigate('/Register')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
    <header>
		<h1>PBR Care</h1>
		<nav>
			<ul>
            <button onClick={NavToLogin}>Login</button>
            <button onClick={NavToRegister}>Register</button>
			</ul>
		</nav>
	</header>
    <body>
        <div className='banner'>
            <div className='textInBanner'>
                <h1>Say goodbye to long wait times and hello to fast and efficient healthcare</h1>
                <h3>Book an appointment in just 5 Minutes !!!</h3>
                <button className='btn btn-primary' onClick={() => navigate('/Register')}>Get Started</button>
            </div>
        </div>
        <div className='photoTestimonyBox'>
           <div>testimonies from previous patients</div>
           <div>
           <img src='generic_doctor.jpg' alt='Doctor photo'/>
           </div>
        </div>
        <div className='locationTextBox'>
            <div className='lTB1'>
            <h1>Wondering where we are ?</h1>
            </div>

            <div className='locationBox'>
            <div>Location from Google maps</div>
            <div>
               Description and landmarks + contact info
            </div>
            </div>
        </div>
        <div className='photoHospital'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
        </div>
        <div className='headerBarSteps'>
                <b><h2>Confused about how things work here ? follow these 3 easy steps</h2></b>
            </div>
        <div className='instructionPanel' >
        
            
            <div>
                <p><b>Step 1 :</b>Register if you haven't ! or just Login with your current account</p>
            </div>
            <div>
                <p><b>Step 2 :</b>On the homepage you will have a wide range of options of doctors available at the moment</p>
                <p>then select a doctor you like based on their profiles </p>
            </div>
            <div>
                <p><b>Step 3 :</b>Enter the date you wold like to book an appointment for and check if it's available</p> 
                <p>based on the availability conditions either proceed with the bookings and choose an appointment type</p>
                <p>and enter your details then click on book</p>
            </div>
            
        </div>
    </body>
    </>
  )
}

export default Landing