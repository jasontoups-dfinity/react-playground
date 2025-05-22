import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import dfinityLogo from '../assets/dfinity-logo.svg';
import ThemeToggle from './ThemeToggle';
import PageWidthSelector from './PageWidthSelector';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-row justify-between items-center p-5">
      <Link
        to="/"
        className="no-underline text-inherit cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-80 flex flex-row items-center">
        <img src={dfinityLogo} alt="DFINITY Logo" className="mr-1" />
        <span className="font-bold text-base leading-tight flex flex-col justify-center">
          REACT
          <br />
          PLAYGROUND
        </span>
      </Link>
    </header>
  );
};

export default Header;
