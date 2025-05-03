// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Coffee Haven</h1>
          <p>Where coffee lovers gather for exceptional brews and community</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/blog" className="btn btn-secondary">Read Our Blog</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h2>Premium Coffee</h2>
          <p>Sourced from the finest beans around the world</p>
        </div>
        <div className="feature">
          <h2>Community</h2>
          <p>Join discussions and connect with fellow coffee enthusiasts</p>
        </div>
        <div className="feature">
          <h2>Coffee Blog</h2>
          <p>Discover brewing tips and coffee culture stories</p>
        </div>
      </section>

      <section className="latest-blogs">
        <h2>Latest from Our Blog</h2>
        <div className="blog-preview-container">
          {/* This would be populated with actual blog previews */}
          <div className="blog-preview">
            <h3>The Art of Pour Over</h3>
            <p>Master the technique for a perfect cup every time...</p>
            <Link to="/blog/1">Read More</Link>
          </div>
          <div className="blog-preview">
            <h3>Coffee Origins: Ethiopia</h3>
            <p>Explore the birthplace of coffee and its rich traditions...</p>
            <Link to="/blog/2">Read More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
