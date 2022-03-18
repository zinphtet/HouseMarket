import React,{useState,useContext}from 'react'
import { Link, Navigate } from 'react-router-dom'
import visibleIcon from '../assets/svg/visibilityIcon.svg'
import hideIcon from '../assets/svg/passwordhide.svg'

import {ReactComponent as ArrowRight}  from '../assets/svg/keyboardArrowRightIcon.svg'
// import { AuthContext } from '../context/AuthContext'
import useSignIn from '../customHooks/useSignIn'

function SignIn() {
  
  const [visible , setVisible] = useState(false)
  const [formData , setFormData] = useState({
    email : '',
    password: ''
  })
  const {signInUser,signInState} = useSignIn()
  // const {currentUser} = useContext(AuthContext)
  const {email , password} = formData;
  const handleInput = (e)=>{
        setFormData((prev)=>({
          ...prev,
          [e.target.id] : e.target.value
        }))
  }
  const handleSubmitSignIn = (e)=>{
    e.preventDefault()
    signInUser(email , password)
    // if(signInState){
      setFormData({
        email:'',
        password:''
      })
    // }
  }
//  if(currentUser) return <Navigate replace to='/profile'/>
  return (
    <div className="pageContainer">
    <header>
      <p className="pageHeader" >
       Welcome Back !
      </p>
      <form onSubmit={handleSubmitSignIn}>
        
        <input type="text" required className="emailInput" id='email' 
        value={email} placeholder='your email' onChange={handleInput}/>
        <div className="passwordInputDiv">
          <input type={visible ? 'text' : 'password'} id='password' 
          value={password}
          required className="passwordInput" placeholder='your password' onChange={handleInput}/>
          <img src={visible ?  hideIcon: visibleIcon } alt="" className="showPassword" onClick={()=>{
            setVisible((prev)=>!prev)
          
          }} />
        </div>
        <Link to='/forgotpassword' className='forgotPasswordLink'>
          Forgot Password
        </Link>
        <div className="signInBar">
          <p className="signInText" >Sign In</p>
          <button className="signInButton" type='submit'>
                 <ArrowRight fill='#fffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
      <Link className='registerLink' to='/signup'>
         Signup Instead
      </Link>
    </header>
  </div>
  )
}

export default SignIn