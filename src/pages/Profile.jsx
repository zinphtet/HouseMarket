import React from 'react'
import {useContext,useState,useEffect} from 'react'
import {AuthContext}  from '../context/AuthContext'
import useLogout from '../customHooks/useLogout'
import useUpdateUser from '../customHooks/useUpdateUser'
import { db } from '../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '../assets/svg/homeIcon.svg'
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import ListingItem from '../components/ListingItem'
import useDeleteDoc from '../customHooks/useDeleteDoc'
function Profile() {
  const {currentUser ,dispatch} = useContext(AuthContext)
  const {displayName , email} = currentUser
  const [change , setChange] = useState(false)
  const [name , setName] = useState(displayName)
  const [unmount , setUnmount] = useState(false)
  const {logout} = useLogout()
  const {updateUser} = useUpdateUser()
  const {deleteDocument,lists} = useDeleteDoc('listings',currentUser.uid)
  useEffect(async () => {
    const docRef = doc(db, "users",currentUser.uid);
    const docSnap = await getDoc(docRef);
    if(!unmount){
      setName(docSnap.data().displayName)
    }
    return ()=>{
      setUnmount(true)
    }
  }, [currentUser.uid])
 
  const handleChange = (e)=>{
    e.preventDefault();
     setName(e.target.value)
  }
  const deleteDoc = (id)=>{
    console.log(id)
    if(window.confirm("Are you sure you want delet ?")){
      deleteDocument(id)
     
    }
      
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
             updateUser('users',currentUser.uid,name)
             dispatch({type:'SET_USER' , payload:{
               ...currentUser , displayName:name
             }})
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
         <Link to='/createlist' className='createListing'>
             <img src={HomeIcon} alt="home Icon" />
             <p>Sell or rent your house</p>
             <img src={ArrowRight} alt="Arrow Right" />
         </Link>
         { lists && <>
           <p className="listingText">
               Your Lists
           </p>
           {lists.length ===0 && <p>No List </p>}
           <ul className='listingList'>
           {lists.map((item,index)=><ListingItem listing={item} key={item.itemId} onDelete={deleteDoc}/>)}
           </ul>
         </>
         }
       </main>
     </div>
  )
}

export default React.memo(Profile)