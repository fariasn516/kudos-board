import React from 'react';
import kudosLogo from '../assets/kudoboard_logo.webp';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  return (
    <header className="header">
      <img src={kudosLogo} alt="Kudo Logo" className="header-logo" />
      <DarkModeToggle />
    </header>
  );
};

export default Header;
