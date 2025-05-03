// src/components/blog/BlogComment.jsx
import React from 'react';
import { formatDate } from '../../utils/formatDate';

const BlogComment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="author">{comment.authorName}</span>
        <span className="date">{formatDate(comment.createdAt)}</span>
      </div>
      <p>{comment.content}</p>
    </div>
  );
};

export default BlogComment;