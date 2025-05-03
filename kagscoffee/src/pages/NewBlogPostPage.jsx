// src/pages/NewBlogPostPage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import BlogForm from '../components/blog/BlogForm';

const NewBlogPostPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="new-blog-page">
      <h1>Write a New Blog Post</h1>
      <BlogForm />
    </div>
  );
};

export default NewBlogPostPage;