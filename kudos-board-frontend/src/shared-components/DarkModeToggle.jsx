import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
    >
      {isDarkMode ? '☀️' : '🌚'}
    </button>
  );
};

export default DarkModeToggle;
