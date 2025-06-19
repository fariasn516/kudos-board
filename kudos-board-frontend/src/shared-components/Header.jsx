import React from 'react';
import kudosLogo from '../assets/kudoboard_logo.webp';

const Header = () => {
  return (
    <header className="header">
      <img src={kudosLogo} alt="Kudo Logo" className="header-logo" />
    </header>
  );
};

export default Header;
