import React, { useContext, useState } from 'react'
import './NavigationBar.css'

import shoplogo from '../Images/shoplogo3.jpeg'
import cart from '../Images/cart2.webp'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../AppContext/StoreContext'



export const NavigationBar = () => {

    const [point,setPoint] =useState('store')
    const {getTotalCartItems} =useContext(StoreContext)
    
  return (
    <div className='navigationbar'>
        <div className="navbar-logo">
            <img src={shoplogo} alt="" />
            <div className="title">
                OneStop
            </div>
        </div>

        <ul className='navbar-tabs'>
            <li > <Link style={{textDecoration:'none',color:'whitesmoke'}} to='/'> Store</Link></li>
            <li><Link style={{textDecoration:'none',color:'whitesmoke'}} to='/mens'>Men</Link></li>
            <li><Link style={{textDecoration:'none',color:'whitesmoke'}} to='/womens'>Women</Link></li>
            <li><Link style={{textDecoration:'none',color:'whitesmoke'}} to='/kids'>Kids</Link></li>
        </ul>


        <div className="navbar-cart">
            {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src= {cart} alt="" /></Link>
            <div className="cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}



