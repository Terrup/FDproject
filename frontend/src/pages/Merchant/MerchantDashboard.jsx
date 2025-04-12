import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaBox, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Dashboard from '../../components/merchant/Dashboard';
import Products from '../../components/merchant/Products';
import Orders from '../../components/merchant/Orders';
import Profile from '../../components/merchant/Profile';
import LogoutButton from '../../components/Merchant/LogoutButton';
import './MerchantDashboard.css';

const MerchantDashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Router>
            <div className={`merchant-dashboard ${isCollapsed ? 'collapsed' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>
                <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <ul>
                        <li><NavLink to="/merchant/dashboard" activeClassName="active"><FaBox /> Dashboard</NavLink></li>
                        <li><NavLink to="/merchant/products" activeClassName="active"><FaShoppingCart /> Products</NavLink></li>
                        <li><NavLink to="/merchant/orders" activeClassName="active"><FaBox /> Orders</NavLink></li>
                        <li><NavLink to="/merchant/profile" activeClassName="active"><FaUser /> Profile</NavLink></li>
                        <li><LogoutButton><FaSignOutAlt /> Logout</LogoutButton></li>
                    </ul>
                </nav>
                <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                    <Routes>
                        <Route path="/merchant/dashboard" element={<Dashboard />} />
                        <Route path="/merchant/products" element={<Products />} />
                        <Route path="/merchant/orders" element={<Orders />} />
                        <Route path="/merchant/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default MerchantDashboard;
