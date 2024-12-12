import React, { useState } from 'react';
import { CustomFlowbiteTheme, Dropdown, Navbar, Modal, Button } from 'flowbite-react';
import Constants from '../constants';
import Image from 'next/image';
import { Rss, HelpCircle } from 'react-feather';

interface INavbarProps {
  current?: string;
  children?: React.ReactNode;
}

const customTheme: CustomFlowbiteTheme['navbar'] = {
  link: {
    active: {
      on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-purple-700',
      off: 'border-b border-gray-700 text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
    },
  },
};

const NavBar = ({ current, children }: INavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <div className="max-w-6xl mx-auto w-full text-gray-800">
      <Navbar fluid rounded theme={customTheme} className="rounded-none">
        <Navbar.Brand href="/">
          <Image
            src="/favicon-64.png"
            width={36}
            height={36}
            className="rounded mr-3 h-6 sm:h-9"
            alt={`${Constants.AppName} logo`}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {Constants.AppName}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/new"
            active={current === 'new'}
            className="text-lg group-hover:text-violet-800"
          >
            New Plugins
          </Navbar.Link>
          <Navbar.Link
            href="/posts"
            active={current === 'posts'}
            className="text-lg"
          >
            Posts
          </Navbar.Link>
          <Navbar.Link
            href="/favorites"
            active={current === 'favorites'}
            className="text-lg"
          >
            Favorites
          </Navbar.Link>
          <Navbar.Link
            href="/plugins"
            active={current === 'all'}
            className="text-lg"
          >
            All Plugins
          </Navbar.Link>
          <li>
            <Dropdown
              inline
              className=""
              label={
                <div className="block font-medium py-2 pl-3 pr-4 md:p-0 text-lg">
                  More
                </div>
              }
            >
              <Dropdown.Item className="group">
                <Navbar.Link
                  href="/updates"
                  active={current === 'updates'}
                  className="text-lg roup-hover:text-violet-800"
                >
                  Latest Updates
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item className="group">
                <Navbar.Link
                  href="/most-downloaded"
                  active={current === 'most-downloaded'}
                  className="text-lg group-hover:text-violet-800"
                >
                  Most Downloaded
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item className="group">
                <Navbar.Link
                  href="/trending"
                  active={current === 'trending'}
                  className="text-lg group-hover:text-violet-800"
                >
                  Trending
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item className="group">
                <Navbar.Link
                  href="/tags"
                  active={current === 'tags'}
                  className="text-lg"
                >
                  Tags
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
          </li>
          {children && children}
          <Navbar.Link
            href="/rss.xml"
            active={false}
            className="text-lg"
            aria-label="RSS Feed"
          >
            <Rss className="text-violet-800" />
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
    {/* Sponsored Ad Placeholder */}
    <div className="bg-gray-100 py-4 text-center">
      <div className="mx-auto">
        <p className="text-lg font-semibold">Your Ad Here</p>
        <p className="text-sm">
          Interested in promoting your content?{' '}
          <a href="mailto:contact.codebuss@gmail.com" className="text-blue-500 underline">
            Contact us
          </a>{' '}
          for sponsorship opportunities.
          <HelpCircle
            className="inline-block ml-2 cursor-pointer text-gray-700"
            size={16}
            onClick={openModal}
          />
        </p>
      </div>
    </div>

    {/* Modal */}
    <Modal show={isModalOpen} onClose={closeModal}>
      <Modal.Header>Why We Need Sponsorship</Modal.Header>
      <Modal.Body className='text-gray-700'>
        <p>
          Our platform is dedicated to keeping the community informed and up-to-date on the latest developments in the Obsidian ecosystem. We maintain a backend system that actively monitors new plugin releases and updates, ensuring timely and accurate information delivery. In addition, we produce weekly posts highlighting new plugins and have created comprehensive resources like the "Wrapped 2024" report.
        </p>
        <br />
        <p>
          Your sponsorship directly supports these efforts by helping us cover operational costs and enabling us to continue delivering high-quality, valuable content to the community. With your support, we can sustain and expand our offerings, keeping the community engaged, informed, and inspired.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} color="dark">Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default NavBar;
