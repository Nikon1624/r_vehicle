import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import styles from './LoginForm.module.scss';
import { Button } from '../common/button';
import { useAppDispatch } from '../../hooks/redux';
import { LoginPayloadType } from '../../models/requestTypes/auth';
import { login } from '../../store/slices/userSlice';

const schema = Yup.object<Record<keyof LoginPayloadType, Yup.AnySchema>>({
  login: Yup.string().required('Поле является обязательным!'),
  password: Yup.string().required('Поле является обязательным!'),
});

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="form" data-testid="form">
          <small>admin / P@$$w0rd</small>
          <h2 className={styles.title}>Вход в систему</h2>
          <div className={styles.fieldsWrapper}>
            <Field
              type="text"
              name="login"
              placeholder={touched.login && errors.login ? errors.login : 'Логин'}
              autoFocus
              className={cn(styles.field, 'form-field', {
                [styles.error]: touched.login && errors.login,
              })}
            />
            <Field
              type="password"
              name="password"
              placeholder={touched.password && errors.password ? errors.password : 'Пароль'}
              className={cn(styles.field, 'form-field', {
                [styles.error]: touched.password && errors.password,
              })}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
