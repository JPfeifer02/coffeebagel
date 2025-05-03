// src/pages/ForumPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ForumList from '../components/forum/ForumList';
import { forumService } from '../services/forumService';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await forumService.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load forum posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be signed in to post');
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const createdPost = await forumService.createPost({
        ...newPost,
        authorId: currentUser.id,
        authorName: currentUser.name,
        createdAt: new Date().toISOString()
      });
      
      setPosts(prev => [createdPost, ...prev]);
      setNewPost({ title: '', content: '' });
      setError('');
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forum-page">
      <div className="forum-header">
        <h1>Community Forum</h1>
        <p>Join the conversation with fellow coffee enthusiasts</p>
      </div>

      {currentUser && (
        <div className="new-post-section">
          <h3>Create a New Post</h3>
          <form onSubmit={handleSubmitPost} className="post-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            
            <button type="submit" className="post-button" disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}

      {!currentUser && (
        <div className="sign-in-prompt">
          <p>Please sign in to participate in the forum.</p>
        </div>
      )}

      <div className="forum-content">
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : posts.length > 0 ? (
          <ForumList posts={posts} />
        ) : (
          <div className="no-posts">No posts yet. Be the first to start a conversation!</div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
