
import React from 'react'
import ImgSrc from '../house-images/exterior_1.jpeg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { Link , useLocation, useParams } from 'react-router-dom'

function ListingItem({listing}) {
    console.log(listing)
      const routePath = useLocation()
    //   console.log(location)
    const {
    name,
    imageUrls,
    location,
    bedrooms,
    bathrooms,
    parking,
    finished,
    offer,
    type,
    userRef,
    discountedPrice,
    regularPrice,
    itemId,
    geolocation,
    timestamp
    } = listing;
    // console.log(id)
    // to={`${location.pathname}/${itemId}`}
  return (
      <>
      <li className="categoryListing">
       <Link className='categoryListingLink ' to={`${routePath.pathname}/${itemId}`}>
               <img src={imageUrls[0]} alt="cateegory img" className='categoryListingImg' />
               <div className="categoryListingDetails">
                   <p className="categoryListingLocation">
                       {location}
                   </p>
                   <p className="categoryListingName">
                        {name}
                   </p>
                   <p className="categoryListingPrice">
                     
                        {offer ? discountedPrice : regularPrice} {type==='rent' ? '$ / Month':' $' } 
                   </p>
                   <div className="categoryListingInfoDiv">
                         <img src={bedIcon} alt="bed icon" />
                         <p className="categoryListingInfoText"> {bedrooms} rooms </p>
                         <img src={bathtubIcon} alt="bathtub icon" />
                         <p className="categoryListingInfoText">{bathrooms} rooms</p>
                   </div>
               </div>
       </Link>
   </li> 
      </>
        
  )
}

export default ListingItem

{/* <div className="categoryListing">
       <Link className='caterogyListinLink'>
               <img src={imageUrls[0]} alt="cateegory img" className='categoryListingImg' />
               <div className="categoryListingDetails">
                   <p className="categoryListingLocation">

                   </p>
                   <p className="categoryListingName">
                        {name}
                   </p>
                   <p className="categoryListingPrice">

                   </p>
                   <div className="categoryListingInfoDiv">
                         <img src={bedIcon} alt="bed icon" />
                         <p className="categoryListingInfoText"></p>
                         <img src={bathtubIcon} alt="bathtub icon" />
                         <p className="categoryListingInfoText"></p>
                   </div>
               </div>
       </Link>
   </div> */}