import React from 'react'
import {useContext,useState} from 'react'
import {AuthContext}  from '../context/AuthContext'
import useLogout from '../customHooks/useLogout'

function Profile() {
  const {currentUser } = useContext(AuthContext)
  console.log(currentUser)
  const {displayName , email} = currentUser
  const [change , setChange] = useState(false)
  const [name , setName] = useState(displayName)
  const {logout} = useLogout()
 
  const handleChange = (e)=>{
    e.preventDefault();
     setName(e.target.value)
  }
  return (
     <div className="profile">
       <header className="profileHeader">
         <p className="pageHeader">My Profile</p>
         <button className="logOut" onClick={()=>logout()}>Logout</button>
       </header>
       <main>
         <div className="profileDetailsHeader">
           <p className="profileDetailsText">Personal Details</p>
           <p className='changePersonalDetails' onClick={()=>{
             setChange((prev)=>{
               return !prev
             })
           }}>
             {change ?'done': 'change' }
             </p>
         </div>
         <div className="profileCard">
           <form >
              <input type="text" className={change ? 'profileNameActive' : 'profileName'} value={name} disabled={!change}
               onChange={handleChange}
              />
              <input type="text" className="profileEmail" value={email} disabled/>
              
           </form>
         </div>
       </main>
     </div>
  )
}

export default Profile