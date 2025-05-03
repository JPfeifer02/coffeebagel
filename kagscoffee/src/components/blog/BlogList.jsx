// src/components/blog/BlogList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog.id} className="blog-card">
          {blog.coverImage && (
            <div className="blog-image">
              <img src={blog.coverImage} alt={blog.title} />
            </div>
          )}
          <div className="blog-content">
            <h2>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </h2>
            <div className="blog-meta">
              <span className="author">By {blog.authorName}</span>
              <span className="date">{formatDate(blog.createdAt)}</span>
            </div>
            <p className="blog-excerpt">{blog.excerpt || blog.content.substring(0, 150)}...</p>
            <Link to={`/blog/${blog.id}`} className="read-more">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
