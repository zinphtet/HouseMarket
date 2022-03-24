
import React from 'react'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { Link , useLocation } from 'react-router-dom'
import {ReactComponent as DeleteIcon}  from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon}  from '../assets/svg/editIcon.svg'
function ListingItem({listing,onDelete,onEdit}) {

      const routePath = useLocation()
    
    const {
    name,
    imageUrls,
    bedrooms,
    bathrooms,
    offer,
    type,
    discountedPrice,
    regularPrice,
    itemId,
    address
    } = listing;
  return (
      <>
      <li className="categoryListing">
       <Link className='categoryListingLink ' to={`${routePath.pathname}/${itemId}`}>
               <img src={imageUrls[0]} alt="cateegory img" className='categoryListingImg' />
               <div className="categoryListingDetails">
                   <p className="categoryListingLocation">
                       {address}
                   </p>
                   <p className="categoryListingName">
                        {name}
                   </p>
                   <p className="categoryListingPrice">
                     
                        {offer ? discountedPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : regularPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {type==='rent' ? '$ / Month':' $' } 
                   </p>
                   <div className="categoryListingInfoDiv">
                         <img src={bedIcon} alt="bed icon" />
                         <p className="categoryListingInfoText"> {bedrooms} rooms </p>
                         <img src={bathtubIcon} alt="bathtub icon" />
                         <p className="categoryListingInfoText">{bathrooms} rooms</p>
                   </div>
               </div>
       </Link>
   
   {
       onDelete && <DeleteIcon
        className="removeIcon"
        fill='red'
        title='delete item ?'
        onClick={()=> onDelete(listing.itemId)}
       />
   }
    {
       onEdit && <EditIcon
        className="editIcon"
        title='edit item ?'
        onClick={()=> onEdit(listing.itemId)}
       />
   }

   </li> 
      </>
        
  )
}

export default ListingItem

