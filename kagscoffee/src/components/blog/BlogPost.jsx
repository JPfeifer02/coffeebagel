// src/components/blog/BlogPost.jsx
import React from 'react';
import { formatDate } from '../../utils/formatDate';

const BlogPost = ({ blog }) => {
  return (
    <article className="blog-post">
      <header className="blog-header">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          <span className="author">By {blog.authorName}</span>
          <span className="date">{formatDate(blog.createdAt)}</span>
        </div>
      </header>
      
      {blog.coverImage && (
        <div className="blog-cover-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-content">
        {blog.content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
      
      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-tags">
          {blog.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};

export default BlogPost;
