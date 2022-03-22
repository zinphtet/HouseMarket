import React from 'react'
import useGetDocs from '../customHooks/useGetDocs'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom';

//swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay ])

function Slide() {
    const navigate = useNavigate()
    const {data,loading} = useGetDocs()
    console.log(data)

  if(loading) return <Spinner/>
  return (
      <>

{data && (
          <>
        <p className="exploreHeading">Recommend</p>
        <Swiper
        modules={[ Pagination,Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true ,type:'bullets' }}
        autoplay={{delay:3000}}
        loop={true}
      >
          {
              data.map((item,index)=>
                   (<SwiperSlide key={index} >
                          <div className="swiperSlideDiv" style={{
                              background:`url(${item.imageUrls[0]}) center no-repeat`,
                              backgroundSize:'cover',
                              }}
                            onClick={()=>navigate(`/category/${item.type}/${item.itemId}`)}
                              >
                                 <p className="swiperSlideText">{item.name}</p>
                                 <p className="swiperSlidePrice">
                                 {item.offer ? item.discountedPrice.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.regularPrice.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {item.type==='rent' ? '$ / Month':' $' } 
                                 </p>
                          </div>
                    
                  </SwiperSlide>)
              )
          }
       
      </Swiper>
        
        </>
        )}
      </>
  )
}

export default Slide