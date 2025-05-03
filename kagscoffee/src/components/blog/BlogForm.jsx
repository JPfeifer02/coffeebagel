// src/components/blog/BlogForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { blogService } from '../../services/blogService';

const BlogForm = ({ blog }) => {
  const isEditing = !!blog;
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    tags: blog?.tags?.join(', ') || '',
    coverImage: blog?.coverImage || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        authorId: currentUser.id,
        authorName: currentUser.name
      };
      
      if (isEditing) {
        await blogService.updateBlog(blog.id, blogData);
        navigate(`/blog/${blog.id}`);
      } else {
        const newBlog = await blogService.createBlog({
          ...blogData,
          createdAt: new Date().toISOString()
        });
        navigate(`/blog/${newBlog.id}`);
      }
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} blog post`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="coverImage">Cover Image URL (optional)</label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="15"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated, optional)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="coffee, brewing, tips"
        />
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={() => navigate(-1)} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update Post' : 'Publish Post')}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;