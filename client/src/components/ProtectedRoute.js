import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('firstName') !== null; // Check if user is logged in

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
