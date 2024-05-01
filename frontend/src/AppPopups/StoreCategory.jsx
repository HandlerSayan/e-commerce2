import React, { useContext } from 'react'
import './CSS/StoreCategory.css'
import { StoreContext } from '../AppContext/StoreContext'
import dropIcon from '../AppComponents/Images/dropdown_icon.png'
import { Items } from '../AppComponents/Items/Items'
import all_product from '../AppComponents/Images/all_product'

export const StoreCategory = (props) => {
  const {all_product} = useContext(StoreContext)
  return (
    <div className='store-category'>
      <img className='storecategory-banner' src={props.banner}/>
      <div className="storecategory-indexSort">
        <p>
          <span>Showing 1-16</span> out of 36 products
        </p>
        <div className="storecategory-sort">
          Sort by <img src={dropIcon}/>
        </div>
      </div>
      <div className="storecategory-products">
        {all_product.map((item,i)=>{
          if(props.category===item.category){
           return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          } else{
            return null
          }
        })}
      </div>
      {/* <div className="load">
        Load more
      </div> */}
      
    </div>
  )
}
