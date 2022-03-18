import React,{useState}from 'react'
import { Link } from 'react-router-dom'
import visibleIcon from '../assets/svg/visibilityIcon.svg'
import hideIcon from '../assets/svg/passwordhide.svg'

import {ReactComponent as ArrowRight}  from '../assets/svg/keyboardArrowRightIcon.svg'

import useSignUp from '../customHooks/useSignUp'

function SignUp() {
  
  const [visible , setVisible] = useState(false)
  const [formData , setFormData] = useState({
    email : '',
    password: '',
    name : ''
  })
const {signUpUser} = useSignUp()

  const {email , password,name} = formData;
  const handleInput = (e)=>{
        setFormData((prev)=>({
          ...prev,
          [e.target.id] : e.target.value
        }))
  }
  const handleSubmitSignIn = (e)=>{
    e.preventDefault()
   signUpUser(name , email , password)
    setFormData({
      name:'',
      email : '',
      password:''
    })
  }
 
  return (
    <div className="pageContainer">
    <header>
      <p className="pageHeader" >
      Sign Up Account
      </p>
      <form onSubmit={handleSubmitSignIn}>
      <input type="text" required className="nameInput" id='name' 
        value={name} placeholder='your name' onChange={handleInput}/>
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
        <div className="signUpBar">
          <p className="signUpText" >Sign Up</p>
          <button className="signUpButton" type='submit'>
                 <ArrowRight fill='#fffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
      <Link className='registerLink' to='/signin'>
         SignIn Instead
      </Link>
      
       {/* <h2>Hello</h2> */}
    </header>
  </div>
  )
}

export default SignUp