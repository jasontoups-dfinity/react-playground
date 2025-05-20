import React from 'react';
import './Header.css';
import dfinityLogo from '../assets/dfinity-logo.svg';

const Header: React.FC = () => {
  return (
    <header className="w-100 flex flex-row">
      <img src={dfinityLogo} alt="DFINITY Logo" className="mr-1" />
      <span className="logo-text">
        REACT
        <br />
        PLAYGROUND
      </span>
    </header>
  );
};

export default Header;
