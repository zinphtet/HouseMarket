import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImg from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImg from '../assets/jpg/sellCategoryImage.jpg'
import Slide from '../components/Slide'
function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">
          Explore
        </p>
      </header>
      <main>
        <Slide/>
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
              <img src={rentCategoryImg} alt="rent img" className='exploreCategoryImg' />
            <p className="exploreCategoryName" >Places for Rent</p>
          </Link>
          <Link to='/category/sell'>
              <img src={sellCategoryImg} alt="rent img" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for Sale</p>
          </Link>
            
        </div> 
      </main>
    </div>
  )
}

export default Explore