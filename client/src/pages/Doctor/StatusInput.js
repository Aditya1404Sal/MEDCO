import React from 'react'
import Layout from '../../components/Layout'

const StatusInput = () => {
  return (
   <Layout>
    <div>
        <button className='btn btn-success'>Doctor In</button>
        <button className='btn btn-danger'>Doctor Out</button>
    </div>
    <div>
       <h4> Number of patients present :</h4>
        <button className='btn btn-primary'>Reset</button>
    </div>
   </Layout>
  )
}

export default StatusInput