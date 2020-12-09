import React from 'react';
import useLocalStorage from './useLocalStorage';
import './ColorMode.scss';

const DarkMode: React.FC = () => {

  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true);
  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
  };

  return (
    <button 
      type='button'
      onClick={toggleTheme}
    >
      { isDarkTheme ? 'dark' : 'light'}
    </button>
  );
};

export default DarkMode;

// className={darkMode ? "dark-mode" : "light-mode"}