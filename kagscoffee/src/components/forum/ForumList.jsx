// src/components/forum/ForumList.jsx
import React from 'react';
import ForumPost from './ForumPost';

const ForumList = ({ posts }) => {
  return (
    <div className="forum-list">
      {posts.map(post => (
        <ForumPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ForumList;