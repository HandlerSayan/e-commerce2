import React, { useEffect, useState } from 'react'
import './Collections.css'
// import new_collections from '../Images/new_collections'
import { Items } from '../Items/Items'



export const Collections = () => {
  const [new_collection,setNew_collection] = useState([])

  useEffect(()=>{
fetch('https://e-commerce2-puce.vercel.app/newcollections')
.then((res)=>res.json())
.then((data)=>setNew_collection(data))
  },[])


  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
         {new_collection.map((item,i)=>{
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
         })}
        </div>
    </div>
  )
}
