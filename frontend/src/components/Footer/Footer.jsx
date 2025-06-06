import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='bingologofooter' src={assets.logo} alt="" />
            <p>Follow Us</p>
            <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact Us</h2>
            <ul>
              <li>+1-408-000-0000</li>
              <li>contact@bingo.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2025 © Bingo.com - All rights reserved. "School Project for DEMO ONLY."</p>
    </div>
  )
}

export default Footer