// src/pages/CreateAccountPage.jsx
import React from 'react';
import CreateAccountForm from '../components/auth/CreateAccountForm';

const CreateAccountPage = () => {
  return (
    <div className="auth-page">
      <h1>Create Account</h1>
      <CreateAccountForm />
    </div>
  );
};

export default CreateAccountPage;