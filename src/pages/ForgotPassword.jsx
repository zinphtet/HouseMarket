
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowRight} from '../assets/svg/keyboardArrowRightIcon.svg'
import useResetPass from '../customHooks/useResetPass'
function ForgotPassword() {
  const {resetPass} = useResetPass()
  const [email , setEmail] = useState('')
  const emailHandler = (e)=>{
    setEmail(e.target.value)
  }
 const submitHandler = (e)=>{
   e.preventDefault();
   resetPass(email)
   setEmail('')
 }
  return (
   <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>
      <main>
        <form onSubmit={submitHandler}>
          <input type="email" className="emailInput" value={email} onChange={emailHandler}  />
          <Link className="forgotPasswordLink" to='/signin'>
            Sign In
          </Link>
          <div className="signInBar">
          <p className="signInText" >Send Reset Link</p>
          <button className="signInButton" type='submit'>
                 <ArrowRight fill='#fffff' width='34px' height='34px'/>
          </button>
        </div>
        </form>
      </main>
   </div>
  )
}

export default ForgotPassword