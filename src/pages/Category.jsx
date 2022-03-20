import React from 'react'
import {useLocation ,useParams} from 'react-router-dom'
import useGetDocs from '../customHooks/useGetDocs'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
function Category() {
    const location = useLocation()
    const {routeName} = useParams()
    let query = ['type' , '==',routeName]
    if(!routeName) query = [location.pathname.slice(1) ,'==',true]
    const {data,loading} = useGetDocs(query)
 
     if(routeName!=='rent' && routeName !=='sell' && location.pathname.slice(1)!=='offer')return <div>Nothing here...</div>
  return (
   <div className="category">
       <header>
           <p className="pageHeader">
               {!routeName ? 'Special Offer' :`Places for ${routeName}`}
           </p>
       </header>
       {loading ? <Spinner/> : data && !data.length > 0 ? <div>No Items found</div>: (<>
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

export default Category