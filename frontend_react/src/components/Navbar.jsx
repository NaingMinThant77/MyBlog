import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import RenderNavLinks from './RenderNavLinks';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-4 sm:px-8 md:px-16 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        BLOG.io
      </Link>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden">
        <button onClick={toggleMenuHandler} >
          {!isMenuOpen && <Bars3Icon className="h-9 w-9 text-white" />}
        </button>
      </div>

      {/* Fullscreen Overlay for Small Screens */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex flex-col items-center justify-center space-y-8 z-50 sm:hidden">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={toggleMenuHandler}
            aria-label="Close Menu"
          >
            <XMarkIcon className="h-11 w-11" />
          </button>

          {/* Menu Links */}
          <RenderNavLinks
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      )}

      {/* Menu Links for Larger Screens */}
      <div className="hidden sm:flex space-x-6">
        <RenderNavLinks
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
