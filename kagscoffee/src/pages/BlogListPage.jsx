// src/pages/BlogListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BlogList from '../components/blog/BlogList';
import { blogService } from '../services/blogService';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getBlogs();
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-page">
      <div className="blog-header">
        <div>
          <h1>Coffee Blog</h1>
          <p>Brewing insights, tips, and coffee culture stories</p>
        </div>
        {currentUser && (
          <Link to="/blog/new" className="new-blog-button">
            Write New Post
          </Link>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading blog posts...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <div className="no-blogs">No blog posts yet.</div>
      )}
    </div>
  );
};

export default BlogListPage;