import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>No more wait! Order your favorite food here</h2>
            <a href="#explore-menu"><button className='buttonwl'>View Menu</button></a>
        </div>
    </div>
  )
}

export default Header