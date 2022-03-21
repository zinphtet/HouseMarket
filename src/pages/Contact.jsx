import { useState,useEffect } from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import React from 'react'
import { db } from '../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

function Contact() {
    const [message , setMessage] = useState('')
    const [searchParams , setSearchParams] = useSearchParams()
    const [landlord, setLandlord] = useState(null)
   const param = useParams()
    useEffect(()=>{
        const fetchListing =async ()=>{
                    const docRef = doc(db, "users",param.userRef);
                    const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                   setLandlord(docSnap.data());
                     } else {
                     toast.error("Fetching Landlord data")
                }
        }
        fetchListing()
    },[param.userRef])

    const onChange = (e)=>setMessage(e.target.value)

  return (
   <div className="pageContainer">
       <header>
           <p className="pageHeader">
               Contact Landlord
           </p>
       </header>
       {landlord && (
           <main>
               <div className="contactLandlord">
                   <p className="landlordName">
                       Contact <span>{landlord?.displayName}</span> 
                   </p>
               </div>
               <form className='messageForm'>
                    <div className="messageDiv">
                        <label htmlFor="message" className="messageLabel" >
                            Message
                        </label>
                        <textarea name="message" id="message" value={message} className='textarea'
                         onChange={onChange}
                        >

                        </textarea>
                    </div>
                    <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName ')}&body=${message}`}>
                        <button className="primaryButton" type='button'>Send Message</button>
                    </a>
               </form>
           </main>
       )}

   </div>
  )
}

export default Contact