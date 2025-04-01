import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <nav role="navigation" aria-label="Main Navigation" className="bg-beige-100 dark:bg-gray-800 h-16 flex items-center justify-between px-4 shadow-sm">
      <Link to="/" aria-label="Home">
        <img src={logo} alt="Dishcovery Logo" className="h-10" />
      </Link>
      <div className="flex space-x-4 items-center">
        <Link to="/favorites" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400" aria-label="Favorites">
          Favorites
        </Link>
        <Link to="/shopping-list" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400" aria-label="Shopping List">
          Shopping List
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
          aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Link to="/signin" className="border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-beige-200 dark:hover:bg-gray-700" aria-label="Sign In">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;