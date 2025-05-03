import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Coffee Haven</h3>
          <p>Your cozy corner for great coffee and community.</p>
        </div>
        <div className="footer-section">
          <h3>Visit Us</h3>
          <p>123 Coffee Street</p>
          <p>Brewtown, CF 98765</p>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Coffee Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
