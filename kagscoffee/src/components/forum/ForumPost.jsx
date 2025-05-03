// src/components/forum/ForumPost.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { forumService } from '../../services/forumService';
import { formatDate } from '../../utils/formatDate';

const ForumPost = ({ post }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(post.replies || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleReplyClick = () => {
    if (!currentUser) {
      setError('You must be signed in to reply');
      return;
    }
    setIsReplying(!isReplying);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      setError('Reply content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const newReply = {
        content: replyContent,
        authorId: currentUser.id,
        authorName: currentUser.name,
        createdAt: new Date().toISOString()
      };
      
      const updatedReply = await forumService.addReply(post.id, newReply);
      setReplies(prev => [...prev, updatedReply]);
      setReplyContent('');
      setIsReplying(false);
      setError('');
    } catch (err) {
      setError('Failed to post reply');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forum-post">
      <div className="post-header">
        <h3>{post.title}</h3>
        <div className="post-meta">
          <span className="author">By {post.authorName}</span>
          <span className="date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="post-actions">
        <button onClick={handleReplyClick} className="reply-button">
          {isReplying ? 'Cancel Reply' : 'Reply'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {isReplying && (
        <form onSubmit={handleSubmitReply} className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            rows="3"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Reply'}
          </button>
        </form>
      )}
      
      {replies.length > 0 && (
        <div className="replies-section">
          <h4>Replies</h4>
          <div className="replies-list">
            {replies.map((reply, index) => (
              <div key={index} className="reply">
                <div className="reply-header">
                  <span className="author">{reply.authorName}</span>
                  <span className="date">{formatDate(reply.createdAt)}</span>
                </div>
                <p>{reply.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPost;