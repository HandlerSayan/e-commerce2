import React, { createContext, useEffect, useState } from "react";
// import all_product from "../AppComponents/Images/all_product";


export const StoreContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}




const StoreContextProvider = (props)=>{
     const [all_product,setAll_product] = useState([])
     const [cartItems, setCartItems] = useState(getDefaultCart())


     useEffect(()=>{
      fetch('https://e-commerce2-puce.vercel.app/allproducts')
      .then((res)=>res.json())
      .then((data)=>setAll_product(data))

      if(localStorage.getItem('auth-token')){
        fetch('https://e-commerce2-puce.vercel.app/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            "Content-Type":'application/json',
            "auth-token":`${localStorage.getItem('auth-token')}`
          },
          body:"",
        })
        .then((res)=>res.json())
        .then((data)=>setCartItems(data))
      }

      
     },[])

   
    
     //add to cart function
    const addToCart = (itemId)=>{
       setCartItems((previous)=>({...previous,[itemId]:previous[itemId]+1}))
       if(localStorage.getItem('auth-token')){
        fetch('https://e-commerce2-puce.vercel.app/addtocart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            "Content-Type":'application/json',
            "auth-token":`${localStorage.getItem('auth-token')}`
          },
          body:JSON.stringify({"itemId":itemId})
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))
       }
    }
     
 
    //Remove from cart function
    const removeFromCart = (itemId)=>{
        setCartItems((previous)=>({...previous,[itemId]:previous[itemId]-1}))
        if(localStorage.getItem('auth-token')){
          fetch('https://e-commerce2-puce.vercel.app/removefromcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            "Content-Type":'application/json',
            "auth-token":`${localStorage.getItem('auth-token')}`
          },
          body:JSON.stringify({"itemId":itemId})
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))
        }
     }


    // Total cart amount
    const getTotalCartAmount = ()=>{
      let totalAmount = 0
      for(const item in cartItems){
        if(cartItems[item]>0){
           let itemInfo = all_product.find((product)=>product.id === Number(item))
           totalAmount += cartItems[item] * itemInfo.new_price
        }  
      }
      return totalAmount;
    }
   


    const getTotalCartItems = ()=>{
      let totalItem = 0;
      for(const item in cartItems){
        if(cartItems[item]>0){
          totalItem += cartItems[item]
        }
      }

      return totalItem;
    }

  

     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <StoreContext.Provider value={contextValue}>
          {props.children}
        </StoreContext.Provider>
      );
    };
    
    export default StoreContextProvider;