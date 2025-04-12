import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== 'merchant') {
        return <Navigate to="/merchant/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
