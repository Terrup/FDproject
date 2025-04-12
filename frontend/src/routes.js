import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MerchantLogin from './pages/Merchant/MerchantLogin';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/merchant/login" element={<MerchantLogin />} />
                
                {/* Protected Merchant Routes */}
                <Route path="/merchant/*" element={
                    <ProtectedRoute>
                        <MerchantDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
