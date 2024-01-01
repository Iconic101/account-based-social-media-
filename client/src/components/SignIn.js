import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
// import './components'
const SignIn = () => {
  const [IsSignUp, setIsSignUp] = useState(true)
  const [inputs, setInputs] = useState({
    name:"",
    email:'',
    password:''
  })
  const navigate=useNavigate()
  const request=async(type='login')=>{
    try {
      const res=await axios.post(`http://localhost:5000/${type}`,inputs)
      const data=await res.data
          return data
    } catch (error) {
      console.log(error)
    }
}
  const handleSubmit=(e)=>{
    console.log("hello")
    e.preventDefault()
    let token,data
    if(IsSignUp){
   (request('Signup')).then(data=>{
    console.log(data);
    localStorage.setItem('token',data.token)
    // localStorage.removeItem('user name')
    if(data.user){
      (navigate('/feed'))
    }
   })
    //  localStorage.removeItem('token',data.token)
    

    }
    else{
    (request()).then(data=>{
      console.log(data);
      localStorage.setItem('token',data.token)
      // localStorage.removeItem('user name')
      if(data.existingUser){
        (navigate('/feed'))
      }
     })
    }  
}
  const handleChange=(e)=>{
    e.preventDefault()

    setInputs((prev)=>{
      return(
        {
          ...prev,
          [e.target.name]:e.target.value
        }
      )
    })
  }

  return (
    <div className='signWrapper'>
      <form className='LoginForm'>
      <span className='title'>Photo Share</span>
      <input type="email" onChange={handleChange} name='email' value={inputs.email
      } placeholder=' Email'/>
     { IsSignUp && <input
       type="text" onChange={handleChange} name='name' value={inputs.name} 
       placeholder=' User Name'/>}
      <input type="password" onChange={handleChange} name='password' value={inputs.password
      } placeholder='Password'/>

      <button  className='SumbitButton' onClick={handleSubmit}>{IsSignUp ? 'Sign Up' : "Login"}</button>
      <button  className='toggle' onClick={(e)=>{
        e.preventDefault()
        setIsSignUp(!IsSignUp)
        console.log(IsSignUp)
      }}>{IsSignUp?'Login instead':<p><small>new?</small>  Signup</p>}</button>
      </form>
    </div>
  )
}

export default SignIn
