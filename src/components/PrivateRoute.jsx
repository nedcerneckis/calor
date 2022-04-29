import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
  }