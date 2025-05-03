import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/components/navbar.css';

const Navbar = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Coffee Haven
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/forum" className="nav-link">Community</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          
          {currentUser ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleSignOut} className="nav-button">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/create-account" className="nav-button">Join Us</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;