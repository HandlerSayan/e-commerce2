import React, { useEffect, useState } from 'react'
import './Famous.css'
// import data_product from '../Images/data'
import { Items } from '../Items/Items'



export const Famous = () => {
  const [trending,setTrending] = useState([])
  useEffect(()=>{
  fetch('http://localhost:4000/trending')
  .then((res)=>res.json())
  .then((data)=>setTrending(data))
  },[])
  return (
    <div className='famous'>
       <h1>Trending in Women</h1>
       <hr/>
       <div className="famous-item">
        {trending.map((item,i)=>{
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
       </div>
    </div>
  )
}
