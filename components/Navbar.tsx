import React from 'react';
import { CustomFlowbiteTheme, Dropdown, Navbar } from 'flowbite-react';
import Constants from '../constants';
import Image from 'next/image';
import { Rss } from 'react-feather';

interface INavbarProps {
  current?: string;
  children?: React.ReactNode;
}

const customTheme: CustomFlowbiteTheme["navbar"] = {
  link: {
    active: {
      on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-purple-700',
      off: "border-b border-gray-700 text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
    },
  }
};
  

const NavBar = ({ current, children }: INavbarProps) => {
  return (
    <div className='max-w-6xl mx-auto w-full text-gray-800'>
      <Navbar fluid rounded theme={customTheme} className='rounded-none'>
        <Navbar.Brand href="/">
          <Image src="/logo-64.png" width={36} height={36} className="rounded mr-3 h-6 sm:h-9" alt={`${Constants.AppName} logo`} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {Constants.AppName}
            </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <li><Dropdown inline className="" label={<div className="block font-medium py-2 pl-3 pr-4 md:p-0 text-lg">
            Plugins
          </div>}>
            <Dropdown.Item className='group'>
              <Navbar.Link href="/new" active={current === 'new'} className='text-lg group-hover:text-violet-800'>New Plugins</Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item className="group">
              <Navbar.Link href="/updates" active={current === 'updates'}  className='text-lg roup-hover:text-violet-800'>Latest Updates</Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item className="group">
              <Navbar.Link href="/most-downloaded" active={current === 'most-downloaded'}  className='text-lg group-hover:text-violet-800'>Most Downloaded</Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item className="group">
              <Navbar.Link href="/trending" active={current === 'trending'}  className='text-lg group-hover:text-violet-800'>Trending</Navbar.Link>
            </Dropdown.Item>
          </Dropdown></li>
          <Navbar.Link href="/posts" active={current === 'posts'}  className='text-lg'>Posts</Navbar.Link>
          <Navbar.Link href="/favorites" active={current === 'favorites'}  className='text-lg'>Favorites</Navbar.Link>
          <Navbar.Link href="/tags" active={current === 'tags'}  className='text-lg'>Tags</Navbar.Link>
          <Navbar.Link href="/plugins" active={current === 'all'}  className='text-lg'>All Plugins</Navbar.Link>
          {children && children}
          <Navbar.Link href="/rss.xml" active={false} className='text-lg'>
            <Rss className='text-violet-800'/>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
