import React from 'react';
import { LoginForm } from '../../components/login-form';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.scss';

type LocationProps = {
  state: {
    from: Location;
  };
};

export const Login: React.FC = () => {
  const { isAuth } = useAuth();
  const location = useLocation() as LocationProps;
  const from = location.state?.from?.pathname || '/';

  if (isAuth) {
    return <Navigate to={from} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner} />
      <div className={styles.loginFormWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};
