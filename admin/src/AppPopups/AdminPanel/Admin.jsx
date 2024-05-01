import React from 'react'
import './Admin.css'
import Sidebar from '../../AppComponents/Sidebar/Sidebar'
import { Routes,Route} from 'react-router-dom'
import Add from '../../AppComponents/Add/Add'
import List from '../../AppComponents/List/List'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<Add/>}/>
        <Route path='/listproduct' element={<List/>}/>
      </Routes>
    </div>
  )
}

export default Admin