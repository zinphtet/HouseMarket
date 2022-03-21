import React from 'react'
import ShareIcon from '../assets/svg/shareIcon.svg'
import {useState,useEffect} from 'react'
import Spinner from '../components/Spinner'
import { doc, getDoc } from "firebase/firestore";
import {Link, useNavigate, useParams}  from 'react-router-dom'
import { auth, db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

//import swiper

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
//  import 'swiper/css/navigation.css';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y ])

function SingleList() {
    const [shareLinkCopy , setShareLinkCopy] = useState(false)
    const [listing , setListing] = useState(null)
    const [loading , setLoading] = useState(true)
    
    // if(loading) return <Spinner/>
    const navigate = useNavigate();
    const param = useParams()
    // console.log(param)

    useEffect(() => {
      const fetchDoc = async ()=>{
        const docRef = doc(db, "listings", param.listId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setListing(docSnap.data())
         console.log("Document data:", docSnap.data());
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
        {/* //sidebar will come */}
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination,Scrollbar, A11y]}
      slidesPerView={1}
    >
        {
            listing.imageUrls.map((item,index)=>
                 (<SwiperSlide key={index} >
                        <div className="swiperSlideDiv" style={{
                            background:`url(${listing.imageUrls[index]}) center no-repeat`,
                            backgroundSize:'cover',
                            }}
                            pagination ={{clickable:true}}
                            >
                            
                        </div>
                  
                </SwiperSlide>)
            )
        }
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ... */}
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
                {listing.location ?? listing.address}
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
        {/* //map */}
        <div className="leafletContainer">
            <MapContainer
             center={[51.505, -0.09]} 
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
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        {auth.currentUser.uid !== listing.userRef &&(
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
             Contact Landlord
            </Link>
        )}
        </div>
    </main>
  )
}

export default SingleList