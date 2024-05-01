import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Images/star_icon.png'
import star_dull_icon from '../Images/star_dull_icon.png'
import { useContext } from 'react'
import { StoreContext } from '../../AppContext/StoreContext'



export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(StoreContext)



  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(99)</p>
        </div>
        <div className="productdisplay-right-prices">
          {/* <div className="productdisplay-right-price-old">{product.old_price}</div> */}
          <div className="productdisplay-right-price-new">Rs.{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>


        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
    
  )
}


{/* <div className='productdisplay'>
        <div className="left">
         <div className="display-img-list">
            <img src={product.image}/>
            <img src={product.image}/>
            <img src={product.image}/>
            <img src={product.image}/>
         </div>
         <div className="display-img">
            <img className='display-main' src={product.image}/>
         </div>
        </div>
        <div className="right">
         <h1>{product.name}</h1>
         <div className="display-right-star">
            <img src={star_icon}/>
            <img src={star_icon}/>
            <img src={star_icon}/>
            <img src={star_icon}/>
            <img src={star_dull_icon}/>
            <p>(100)</p>
         </div>
         <div className="display-right-prices">
            <div className="display-right-oldprice">${product.old_price}</div>
            <div className="display-right-newprice">${product.new_price}</div>

         </div>
         <div className="display-right-description">
         Over the last few years, size inclusivity has been a topic of much debate – and for good reason. While clothing brands have introduced more options across different size spectrums,…
         </div>
         <div className="display-right-size">
            <h1>Select Size</h1>
            <div className="display-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>

         </div>
         <button>ADD TO CART</button>
         <p className='display-right-category'><span>Category :</span>Women, T-shirt, Crop Top</p>
         <p className='display-right-category'><span>Tags :</span>Modern, Latest</p>

        </div>
    </div> */}
