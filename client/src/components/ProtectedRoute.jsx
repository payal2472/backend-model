import React from 'react';
import { Navigate } from 'react-router-dom';

// Replace this with your actual authentication logic
const isAuthenticated = () => {
  // Example: check if a token exists in localStorage
  return !!localStorage.getItem('accessToken');
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
