import React,{useState,useEffect} from 'react'

import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { collection, query, where, getDocs,orderBy,limit ,startAfter} from "firebase/firestore";
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'

function Offer() {
   
    // const {routeName} = useParams()
    // const {data,loading} = useGetDocs(["offer" ,"==",true])

    const [loading,setLoading] = useState(false)
    const [myData,setMyData] = useState([])
    const [lastVisible,setLastVisible] = useState(null)

    useEffect(()=>{
        const fetchListings = async ()=>{
            try{
                setLoading(true)
            const arrData = []
            const q = query(collection(db, "listings"), where("offer", "==",true),orderBy("timestamp","desc"),limit(10));
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
       },[])
       const loadMore = async ()=>{
        try{
           
        const arrData = []
        const q = query(collection(db, "listings"), where("offer", "==",true),orderBy("timestamp","desc"), startAfter(lastVisible),limit(10));
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
    // console.log(routeName)
    if(loading)return <Spinner/>
    // if(routeName!=='rent' && routeName !=='sell')return <div>Nothing here...</div>
  return (
   <div className="category">
       <header>
           <p className="pageHeader">
               {/* Places for {routeName==='rent' ? 'Rent' :'Sale' } */}
               Special Offer
           </p>
       </header>
       {loading ? <div>Loading ...</div> : myData && !myData.length > 0 ? <div>No Items found</div>: (<>
        <main>
           <ul className="categoryListings">
               {
                  myData.map((item,index)=>{
                   
                 return  <ListingItem listing={item} key={index} />
                })
               }
           </ul>
       </main>
       {lastVisible && (
           <p className="loadMore" onClick={loadMore}>
               LoadMore
           </p>
       )}
       </>) }
       
   </div>
  )
}

export default Offer