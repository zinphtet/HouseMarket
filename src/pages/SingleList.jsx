import React from 'react'
import ShareIcon from '../assets/svg/shareIcon.svg'
import {useState,useEffect} from 'react'
import Spinner from '../components/Spinner'
import { doc, getDoc } from "firebase/firestore";
import {Link,  useParams}  from 'react-router-dom'
import { auth, db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

//import swiper

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay ])



function SingleList() {
    const [shareLinkCopy , setShareLinkCopy] = useState(false)
    const [listing , setListing] = useState(null)
    const [loading , setLoading] = useState(true)

    const param = useParams()
    useEffect(() => {
      const fetchDoc = async ()=>{
        const docRef = doc(db, "listings", param.listId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setListing(docSnap.data())
        setLoading(false)
        } else {
         toast.error("Error fetching Doc")
        }
      }
      fetchDoc()
    }, [param.listId])
 
  if(loading) return <Spinner/>
  return (
    <main>
       
      <Swiper
      modules={[ Pagination,Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true ,type:'bullets' }}
      autoplay={{delay:3000}}
      loop={true}
    >
        {
            listing.imageUrls.map((item,index)=>
                 (<SwiperSlide key={index} >
                        <div className="swiperSlideDiv" style={{
                            background:`url(${listing.imageUrls[index]}) center no-repeat`,
                            backgroundSize:'cover',
                            }}
                          
                            >
                         
                        </div>
                  
                </SwiperSlide>)
            )
        }
     
    </Swiper>

    <div className="shareIconDiv" onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopy(true)
            setTimeout(()=>{
                setShareLinkCopy(false)
            },2000)
        }} >
            <img src={ShareIcon} alt="Share Icon" />
        </div>
        {shareLinkCopy && <p className='linkCopied'>Link Copied !</p>}
        <div className="listingDetails">
            <p className="listingName">{listing.name} - ${listing.offer ? listing.discountedPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','):listing.regularPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p className="listingLocation">
                { listing.address}
                {listing.location.lat ==0 && listing.location.lng==0 ?" (Location can't recognize )":''}
            </p>
            <p className="listingType">
               For {listing.type==='rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
                <p className='discountPrice'>
             
                        $ {(listing.regularPrice - listing.discountedPrice).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} discount
                </p>
            )}
            <ul className="listingDetailsList">
                <li>{listing.bedrooms > 1 ? listing.bedrooms : '1'}  bedrooms</li>
                <li>{listing.bathrooms > 1 ? listing.bathrooms : '1'}  bathrooms</li>
               {listing.parking && <li>Parking</li>}
               {listing.furnished && <li>Furnished</li>}
            </ul>
            <p className="listingLocationTitle">
                Location
            </p>
        
        <div className="leafletContainer">
            <MapContainer
             center={[listing.location.lat, listing.location.lng]} 
             zoom={13} 
             style={{
                width:'100% ',
                height:'100%'
                }}
                scrollWheelZoom ={false}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[listing.location.lat, listing.location.lng]}>
                    <Popup>
                    {listing.address}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        {auth.currentUser?.uid !== listing.userRef &&(
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
             Contact Landlord
            </Link>
        )}
        </div>
    </main>
  )
}

export default SingleList