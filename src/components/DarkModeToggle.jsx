import React from 'react';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="dark-mode-toggle"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;



