import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import dfinityLogo from '../assets/dfinity-logo.svg';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-100 flex flex-row justify-between items-center">
      <Link to="/" className="header-link flex flex-row items-center">
        <img src={dfinityLogo} alt="DFINITY Logo" className="mr-1" />
        <span className="logo-text">
          REACT
          <br />
          PLAYGROUND
        </span>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
