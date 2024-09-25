import React, { useState } from 'react';
import Link from 'next/link'

interface INavbarProps {
  current?: string;
  children?: React.ReactNode;
}

export const itemClasses = (current: string, target: string) => target === current ? 'text-violet-500': ''

const NavBar = ({ current }: INavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getClasses = (page: string) => {
    return current === page ? 'font-bold underline underline-offset-4 hover:text-violet-300' : 'hover:text-violet-300 no-underline';
  }

  return (
    <nav className=" text-gray-50">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-violet-900'>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link className="text-3xl font-bold" href="/">
              Obsidian Plugin Stats
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-lg">
            <Link href="/" className={getClasses('home')}>
              Home
            </Link>
            <Link href="/new" className={getClasses('new')}>
              New
            </Link>
            <Link href="/updates" className={getClasses('updates')}>
              Updates
            </Link>
            <Link href="/favorites" className={getClasses('favorites')}>
              Favorites
            </Link>
            <Link href="/most-downloaded" className={getClasses('most-downloaded')}>
              Downloaded
            </Link>
            <Link href="/trending" className={getClasses('trending')}>
              Trending
            </Link>
            <Link href="/tags" className={getClasses('tags')}>
              Tags
            </Link>
            <Link href="/plugins" className={getClasses('all')}>
              All
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Navigation Menu"
              className="hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col pl-4 pb-4 gap-y-2 text-xl text-gray-800 shadow-md py-4">
          <Link href="/" className={getClasses('home')}>
            Home
          </Link>
          <Link href="/new" className={getClasses('new')}>
            New
          </Link>
          <Link href="/updates" className={getClasses('updates')}>
            Updates
          </Link>
          <Link href="/favorites" className={getClasses('favorites')}>
            Favorites
          </Link>
          <Link href="/most-downloaded" className={getClasses('most-downloaded')}>
            Downloaded
          </Link>
          <Link href="/trending" className={getClasses('trending')}>
            Trending
          </Link>
          <Link href="/tags" className={getClasses('tags')}>
            Tags
          </Link>
          <Link href="/plugins" className={getClasses('all')}>
            All
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
