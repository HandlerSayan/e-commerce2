import React from 'react'
import './Super.css'
import handIcon from '../Images/hand.webp'
import arrowIcon from '../Images/arrowIcon.webp'
import modelIcon from '../Images/modelIcon2.jpeg'


export const Super = () => {
  return (
    <div className="super">
        <div className="banner">
            
            <p>Welcome to OneStop
                <br/>
            Unleash your Fashion
            </p>
        </div>


        <div className="model">
            <div className="modelIcon">
               <img className='icon' src={modelIcon}/>

               <h3>Trending</h3>
               <img className='hand' src={handIcon}/>
               <p>Style meets comfort</p>
               
               <div className="collection">
                <button className='p'>Latest Collections <img src={arrowIcon}/></button>
                
                
               </div>


            </div>






            
          
        </div>

    </div>

    
  )
}
 