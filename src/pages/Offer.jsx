import React from 'react'
import {useLocation ,useParams} from 'react-router-dom'
import useGetDocs from '../customHooks/useGetDocs'
import ListingItem from '../components/ListingItem'
function Offer() {
   
    const {routeName} = useParams()
    const {data,loading} = useGetDocs(["offer" ,"==",true])
    console.log(routeName)
    // if(routeName!=='rent' && routeName !=='sell')return <div>Nothing here...</div>
  return (
   <div className="category">
       <header>
           <p className="pageHeader">
               {/* Places for {routeName==='rent' ? 'Rent' :'Sale' } */}
               Special Offer
           </p>
       </header>
       {loading ? <div>Loading ...</div> : data && !data.length > 0 ? <div>No Items found</div>: (<>
        <main>
           <ul className="categoryListings">
               {
                  data.map((item,index)=>{
                   
                 return  <ListingItem listing={item} key={index} />
                })
               }
           </ul>
       </main>
       </>) }
       
   </div>
  )
}

export default Offer