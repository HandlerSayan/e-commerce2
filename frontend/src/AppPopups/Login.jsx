import React, { useState } from 'react'
import './CSS/Login.css'

export const Login = () => {

 const[state,setState] = useState('Login')
 const [formData,setFormData] = useState({
   username:"",
   password:"",
   email:""
 })

 const changeHandler = (e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})

 }

 

 const login = async ()=>{
  console.log("login executed",formData)
  let resData;
  await fetch('https://e-commerce2-puce.vercel.app/login',{
    method:'POST',
    headers:{
      Accept:'application/from-data',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  }).then((res)=>res.json())
  .then((data)=>{
    resData = data
  })
  if(resData.success){
    localStorage.setItem('auth-token',resData.token)
    window.location.replace('/')
  }else{
    alert(resData.error)
  }
 }

 const signUp = async ()=>{
  console.log("sign executed",formData)
  let resData;
  await fetch('https://e-commerce2-puce.vercel.app/signup',{
    method:'POST',
    headers:{
      Accept:'application/from-data',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  }).then((res)=>res.json())
  .then((data)=>{
    resData = data
  })
  if(resData.success){
    localStorage.setItem('auth-token',resData.token)
    window.location.replace('/')
  }else{
    alert(resData.message)
  }
 }


  return (
    <div className='login'>
      <div className="container">
        <h1>{state}</h1>
        <div className="fields">
         {state==="Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Type your name'/> : <></>} 
           <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Type your email'/>
           <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Type your password'/>
        </div>
        <button onClick={()=>{state==='Login'?login():signUp()}}>Proceed</button>
        {state==='Sign Up'?<p className='signup'>Already have an account? <span onClick={()=>{setState('Login')}}>Login here</span></p>: <p className='signup'>Create an account <span onClick={()=>{setState('Sign Up')}}>Click here</span></p>}

        <div className="agree">
          <input type="checkbox" name='' id='' />
          <p>I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
