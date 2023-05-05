import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/DocInfoStyle.css'


const DocInfoCard = ({doctor}) => {
    const navigate = useNavigate();
  return (
   

  
      <div className='DoctorCard m-3 ' onClick={() => {navigate(`/doctor/Booking-Details/${doctor._id}`)}}>
         
           <h2> Dr. {doctor.firstName} {doctor.lastName}</h2>
             <p>
                 <b>Specialization: </b> {doctor.specialization}
           </p>
           <p>
                 <b>Experience: </b> {doctor.experience}
            </p>
             <p>
                 <b>Consultation Fees: </b> {doctor.consultationFee}
             </p>
             <p>
                 <b>Timings: </b> {doctor.timings[0]} to {doctor.timings[1]}
             </p>
         
     </div> 
  )
  
}

export default DocInfoCard