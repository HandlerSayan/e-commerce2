import React from 'react'
import './Offer.css'
import exclusive from '../Images/exclusive.jpeg'


export const Offer = () => {
  return (
    <div className='offers'>

        <div className="left">
        <h1>Exclusive Offers For You</h1>
        {/* <h1>Offers For You</h1> */}
        <p>Best Selling</p>
        <button>Check</button>
        </div>

        <div className="right">
       <img src={exclusive}/>
        </div>
    </div>
  )
}
