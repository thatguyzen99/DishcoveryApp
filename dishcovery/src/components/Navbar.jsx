import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
// Import icons
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon, // Or ArrowLeftOnRectangleIcon for Sign In
  SunIcon,
  MoonIcon,
  BuildingStorefrontIcon // Icon for Pantry
} from '@heroicons/react/24/outline'; // Using outline icons

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Tailwind 'md' breakpoint is 768px
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function for nav link styles
  const linkClasses = "flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200";
  const mobileLinkClasses = "flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"; // Added space-x-2
  const iconClasses = "h-5 w-5"; // Common size for icons

  return (
    // Added relative positioning for the absolute mobile menu
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className="bg-beige-100 dark:bg-gray-800 h-16 flex items-center justify-between px-4 shadow-sm relative z-20" // Added z-20
    >
      {/* Logo - closes mobile menu on click */}
      <Link to="/" aria-label="Home" onClick={() => setIsMenuOpen(false)}>
        <img src={logo} alt="Dishcovery Logo" className="h-10" />
      </Link>

      {/* Desktop Links - Hidden on mobile (md:flex) */}
      <div className="hidden md:flex space-x-4 items-center">
         {/* Pantry Link with Icon */}
        <Link to="/pantry" className={linkClasses}>
           <BuildingStorefrontIcon className={iconClasses} aria-hidden="true" />
           <span>My Pantry</span>
        </Link>
         {/* Favorites Link with Icon */}
        <Link to="/favorites" className={linkClasses}>
           <HeartIcon className={iconClasses} aria-hidden="true" />
           <span>Favorites</span>
        </Link>
         {/* Shopping List Link with Icon */}
        <Link to="/shopping-list" className={linkClasses}>
           <ShoppingCartIcon className={iconClasses} aria-hidden="true" />
           <span>Shopping List</span>
        </Link>
         {/* Dark Mode Button with Icon */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={linkClasses + " p-1"} // Combined classes, added padding
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
        </button>
         {/* Sign In Link with Icon */}
        <Link
          to="/signin"
          className="flex items-center space-x-1 border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-medium py-1 px-3 rounded-lg hover:bg-beige-200 dark:hover:bg-gray-700 transition-colors duration-200" // Adjusted padding/styles
        >
          <UserCircleIcon className={iconClasses} aria-hidden="true" />
          <span>Sign In</span>
        </Link>
      </div>

      {/* Mobile Menu Button - Shown only on mobile (md:hidden) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 p-1" // Added padding
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu" // Link button to the menu it controls
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Panel - Conditionally rendered */}
      <div
        id="mobile-menu" // ID for aria-controls
        className={`absolute top-16 left-0 right-0 bg-beige-100 dark:bg-gray-800 shadow-md md:hidden z-10 border-t border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`} // Slide in/out transition
      >
        {/* Only render content if menu is technically open, prevents flash */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-1 p-4">
            {/* Pantry Link with Icon */}
            <Link to="/pantry" className={mobileLinkClasses} onClick={() => setIsMenuOpen(false)}>
               <BuildingStorefrontIcon className={iconClasses} aria-hidden="true" />
               <span>My Pantry</span>
            </Link>
            {/* Favorites Link with Icon */}
            <Link to="/favorites" className={mobileLinkClasses} onClick={() => setIsMenuOpen(false)}>
               <HeartIcon className={iconClasses} aria-hidden="true" />
               <span>Favorites</span>
            </Link>
            {/* Shopping List Link with Icon */}
            <Link to="/shopping-list" className={mobileLinkClasses} onClick={() => setIsMenuOpen(false)}>
               <ShoppingCartIcon className={iconClasses} aria-hidden="true" />
               <span>Shopping List</span>
            </Link>
            {/* Dark Mode Button with Icon */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                // Keep menu open when changing theme maybe? Or close: setIsMenuOpen(false);
              }}
              className={mobileLinkClasses + " w-full"} // Added w-full
              aria-label={
                darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {darkMode ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
              <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span> {/* Text next to icon */}
            </button>
             {/* Sign In Link with Icon */}
            <Link
              to="/signin"
              className={mobileLinkClasses + " border mt-2 border-gray-800 dark:border-gray-200 rounded-lg justify-center"} // Centered content
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircleIcon className={iconClasses} aria-hidden="true" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;