import React, { ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = <T extends Record<string, unknown>>(Component: ComponentType<T>) => {
  return function Comp(props: Record<string, unknown>) {
    const { isAuth } = useAuth();
    const location = useLocation();

    if (!isAuth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Component {...(props as T)} />;
  };
};
