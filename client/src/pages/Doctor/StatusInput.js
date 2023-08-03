import React from 'react'
import Layout from '../../components/Layout'

const StatusInput = () => {

  const docInHandler = async() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  const docOutHandler = async() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
   <Layout>
    <div>
        <button className='btn btn-success' onClick={docInHandler}>Doctor In</button>
        <button className='btn btn-danger' onClick={docOutHandler}>Doctor Out</button>
    </div>
    <div>
       <h4> Number of patients present:</h4>
       //make an input field  that takws in the number of patients present annd then send that data as a state to a backend
       <button className='btn btn-primary'>Reset</button>
    </div>
   </Layout>
  )
}

export default StatusInput