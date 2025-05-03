// src/pages/BlogPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BlogPost from '../components/blog/BlogPost';
import BlogComment from '../components/blog/BlogComment';
import { blogService } from '../services/blogService';

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getBlogById(id);
        setBlog(fetchedBlog);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be signed in to comment');
      return;
    }

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      const newComment = {
        content: comment,
        authorId: currentUser.id,
        authorName: currentUser.name,
        createdAt: new Date().toISOString()
      };
      
      const updatedBlog = await blogService.addComment(id, newComment);
      setBlog(updatedBlog);
      setComment('');
      setError('');
    } catch (err) {
      setError('Failed to post comment');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!currentUser || (blog && blog.authorId !== currentUser.id)) {
      setError('You do not have permission to delete this post');
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        navigate('/blog');
      } catch (err) {
        setError('Failed to delete blog post');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading blog post...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!blog) {
    return <div className="not-found">Blog post not found</div>;
  }

  return (
    <div className="blog-post-page">
      <BlogPost blog={blog} />
      
      {currentUser && blog.authorId === currentUser.id && (
        <div className="blog-actions">
          <button onClick={() => navigate(`/blog/edit/${id}`)} className="edit-blog">
            Edit Post
          </button>
          <button onClick={handleDeleteBlog} className="delete-blog">
            Delete Post
          </button>
        </div>
      )}
      
      <div className="comments-section">
        <h3>Comments ({blog.comments?.length || 0})</h3>
        
        {currentUser ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
              rows="3"
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div className="sign-in-prompt">
            <p>Please sign in to leave a comment.</p>
          </div>
        )}
        
        {blog.comments && blog.comments.length > 0 ? (
          <div className="comments-list">
            {blog.comments.map((comment, index) => (
              <BlogComment key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="no-comments">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
