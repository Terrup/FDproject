import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

  const { getTotalCartAmount, token, setToken, setUserName } = useContext(StoreContext);

  const navigate = useNavigate();

  // Get the username from localStorage or React Context
  const userName = localStorage.getItem('userName'); // You can also use context if preferred

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Remove username on logout
    setToken('');
    setUserName(''); // Update context state (if used)
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className='navbar'>
        </div>
        <div className="navbar-search-icon">
          <Link to='/cart'><img className='basketlogo' src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button className='signbutton' onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} className='white-filter' alt="" />
            <span className='user-name'>{userName}</span> {/* Display the username */}
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
