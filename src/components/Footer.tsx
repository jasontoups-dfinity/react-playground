import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} DFINITY. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
