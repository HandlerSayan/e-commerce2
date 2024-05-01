import React from 'react'
import './Crum.css'
import arrow from '../Images/breadcrum_arrow.png'

export const Crum = (props) => {
    const {product} = props;
  return (
    <div className='crum'>
        HOME <img src={arrow}/> STORE <img src={arrow}/> {product.category} <img src={arrow}/> {product.name}
    </div>
  )
}
