import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login';
import { PrivateRoutePage } from '../../pages/PrivatePage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getInitializedStatus } from '../../store/slices/appSlice';
import { checkAuth } from '../../store/slices/userSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const appInitialized = useAppSelector(getInitializedStatus);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!appInitialized) {
    return <h1>Loader</h1>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutePage />} />
    </Routes>
  );
};
