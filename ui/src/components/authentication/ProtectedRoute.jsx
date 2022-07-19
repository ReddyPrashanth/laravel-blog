import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../store/entities/auth';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector(state => isAuthenticated(state));
    const location = useLocation();
    if(!isLoggedIn) return <Navigate to="/auth/signin" replace state={{from: location}}/>
    return children;
}

export default ProtectedRoute;