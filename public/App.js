import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const App = () => {
  const [token, setToken] = useState('');

  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSignup = (values) => {
    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  };

  const handleLogin = (values) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => setToken(data.token));
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' });
    setToken('');
  };

  return (
    <div>
      <h1>Task Management App</h1>
      {token ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <>
          <h2>Sign Up</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signupSchema}
            onSubmit={handleSignup}
          >
            <Form>
              <Field name='email' placeholder='Email' />
              <ErrorMessage name='email' component='div' />
              <Field name='password' type='password' placeholder='Password' />
              <ErrorMessage name='password' component='div' />
              <button type='submit'>Create Account</button>
            </Form>
          </Formik>

          <h2>Log In</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <Field name='email' placeholder='Email' />
              <ErrorMessage name='email' component='div' />
              <Field name='password' type='password' placeholder='Password' />
              <ErrorMessage name='password' component='div' />
              <button type='submit'>Log In</button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
};

export default App;