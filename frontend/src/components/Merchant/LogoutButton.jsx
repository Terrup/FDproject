import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button onClick={logout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
