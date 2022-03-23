import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { collection, query, where, getDocs,orderBy,limit ,startAfter} from "firebase/firestore";
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'
function Category() {
   
    const {routeName} = useParams()
    const [loading,setLoading] = useState(false)
    const [myData,setMyData] = useState([])
    const [lastVisible,setLastVisible] = useState(null)
     console.log(routeName)
 
   useEffect(()=>{
    const fetchListings = async ()=>{
        try{
            setLoading(true)
        const arrData = []
        const q = query(collection(db, "listings"), where("type", "==",routeName),orderBy("timestamp","desc"),limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
               return arrData.push({...doc.data(),itemId:doc.id})
        });
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1])
        setMyData(arrData)
        setLoading(false)
          
        }catch(error){
            setLoading(false)
            toast.error("Error fetching data")
        }
        
    }
    fetchListings()
   },[routeName])
   const loadMore = async ()=>{
    try{
     
    const arrData = []
    const q = query(collection(db, "listings"), where("type", "==",routeName),orderBy("timestamp","desc"), startAfter(lastVisible),limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
           return arrData.push({...doc.data(),itemId:doc.id})
    });
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1])
    setMyData((prev)=>[...prev,...arrData])
  
    }catch(error){
       
        toast.error("Error fetching data")
    }
}
  return (
   <div className="category">
       <header>
           <p className="pageHeader">
               {!routeName ? 'Special Offer' :`Places for ${routeName}`}
           </p>
       </header>
       {loading ? <Spinner/> :myData && !myData.length > 0 ? <div>No Items found</div>: (<>
        <main>
           <ul className="categoryListings">
               {
                 myData.map((item,index)=>{
                 return  <ListingItem listing={item} key={index} />
                })
               }
           </ul>
       </main>
       <br />
       <br />
       {lastVisible && (
           <p className="loadMore" onClick={loadMore}>
               LoadMore
           </p>
       )}
       </>) }
       
   </div>
  )
}

export default Category