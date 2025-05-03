// src/pages/SignInPage.jsx
import React from 'react';
import SignInForm from '../components/auth/SignInForm';

const SignInPage = () => {
  return (
    <div className="auth-page">
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;