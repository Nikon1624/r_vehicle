import React from 'react';
import { PrivateRoute } from '../hoc/PrivateRoute';
import { compose } from '@reduxjs/toolkit';

const PrivatePage: React.FC = () => {
  return (
    <div>
      <h2>Private page</h2>
    </div>
  );
};

export const PrivateRoutePage = compose<React.ComponentType>(PrivateRoute)(PrivatePage);
