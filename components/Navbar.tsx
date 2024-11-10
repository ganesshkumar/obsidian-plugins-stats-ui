import React from 'react';
import { CustomFlowbiteTheme, Navbar } from 'flowbite-react';
import Constants from '../constants';

interface INavbarProps {
  current?: string;
  children?: React.ReactNode;
}

const customTheme: CustomFlowbiteTheme["navbar"] = {
  link: {
    active: {
      on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-purple-700',
      off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
    },
  }
};
  

const NavBar = ({ current, children }: INavbarProps) => {
  return (
    <div className='max-w-6xl mx-auto'>
      <Navbar fluid rounded theme={customTheme}>
        <Navbar.Brand href="/">
          <img src="/logo-64.png" className="mr-3 h-6 sm:h-9" alt={`${Constants.AppName} logo`} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {Constants.AppName}
            </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/new" active={current === 'new'} className='text-lg'>New</Navbar.Link>
          <Navbar.Link href="/updates" active={current === 'updates'}  className='text-lg'>Updates</Navbar.Link>
          <Navbar.Link href="/favorites" active={current === 'favorites'}  className='text-lg'>Favoties</Navbar.Link>
          <Navbar.Link href="/most-downloaded" active={current === 'most-downloaded'}  className='text-lg'>Most Downloaded</Navbar.Link>
          <Navbar.Link href="/trending" active={current === 'trending'}  className='text-lg'>Trending</Navbar.Link>
          <Navbar.Link href="/tags" active={current === 'tags'}  className='text-lg'>Tags</Navbar.Link>
          <Navbar.Link href="/plugins" active={current === 'all'}  className='text-lg'>All Plugins</Navbar.Link>
          {children && children}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
