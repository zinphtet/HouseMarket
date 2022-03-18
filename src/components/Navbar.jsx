import React from 'react'
import {useNavigate , useLocation}  from 'react-router-dom';
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as LocalOfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as PersonIcon} from '../assets/svg/personIcon.svg'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const mathUrl = (path)=>{
    return location.pathname === path
  }
  return (
    <footer className="navbar">
       <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={()=> navigate('/')}>
              <ExploreIcon/>
              <p className={mathUrl('/')?'navbarListItemNameActive':'navbarListItemName'}>Explore</p>
          </li>
          <li className="navbarListItem" onClick={()=> navigate('/offer')}>
              <LocalOfferIcon/>
              <p className={mathUrl('/offer')?'navbarListItemNameActive':'navbarListItemName'}>Offer</p>
          </li>
          <li className="navbarListItem" onClick={()=> navigate('/profile')}>
              <PersonIcon/>
              <p className={mathUrl('/profile')?'navbarListItemNameActive':'navbarListItemName'}>Profile</p>
          </li>
        </ul>
       </nav>
    </footer>
  )
}

export default Navbar