import React from 'react'
import './NavigationBar.css'
import navlogo from '../../assets/shoplogo3.jpeg'
import adminLogo from '../../assets/adminLogo.jpg'


const NavigationBar = () => {
  return (
    <div className='navbar'>
        <div className="left">
        <img src={navlogo} className='nav-logo' alt="" />
        <p>OneStop</p>
        </div>
       <div className="right">
        <p>Admin</p>
       <img src={adminLogo} className='admin-logo' alt="" />
       </div>
       
    </div>
  )
}

export default NavigationBar