import React, { useState } from 'react';
import {
  CustomFlowbiteTheme,
  Dropdown,
  Navbar,
  Modal,
  Button,
  MegaMenu,
} from 'flowbite-react';
import Constants from '../constants';
import Image from 'next/image';
import {
  Rss,
  HelpCircle,
  List,
  Tool,
  RefreshCw,
  Calendar,
} from 'react-feather';
import { RiOpenaiFill } from 'react-icons/ri';

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
  return (
    <>
      <div className="max-w-6xl mx-auto w-full text-gray-800">
        <Navbar fluid rounded theme={customTheme} className="rounded-none">
          <Navbar.Brand href="/">
            <Image
              src="/favicon-64.png"
              width={36}
              height={36}
              className="rounded mr-3 sm:h-9"
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
              New
            </Navbar.Link>
            <Navbar.Link
              href="/beta"
              active={current === 'beta'}
              className="text-lg group-hover:text-violet-800"
            >
              Beta
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
                data-testid="dropdown"
                inline
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
                <Dropdown.Item className="group">
                  <Navbar.Link
                    href="/beta"
                    active={current === 'beta'}
                    className="text-lg"
                  >
                    Beta All
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item className="group">
                  <Navbar.Link
                    href="/beta/plugins"
                    active={current === 'beta/plugins'}
                    className="text-lg"
                  >
                    Beta Plugins
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item className="group">
                  <Navbar.Link
                    href="/beta/themes"
                    active={current === 'beta/themes'}
                    className="text-lg"
                  >
                    Beta Themes
                  </Navbar.Link>
                </Dropdown.Item>
              </Dropdown>
            </li>
            <Navbar.Link>
              <MegaMenu.Dropdown
                toggle={
                  <span
                    className={`text-lg font-medium z-50 ${['scorer', 'build-scorer', 'migrate'].includes(current) ? 'text-purple-700 dark:text-primary-500' : ''}`}
                  >
                    Tools
                  </span>
                }
              >
                <ul className="grid grid-cols-1">
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="/tools/dataview-query-wizard"
                        className={`hover:text-primary-600 dark:hover:text-primary-500 hover:text-violet-800 flex items-center gap-x-4 text-lg ${current === 'scorer' ? 'text-purple-700 dark:text-primary-500' : ''}`}
                      >
                        <RiOpenaiFill size={24} />
                        Dataview Query Builder
                      </a>
                    </li>
                    <li>
                      <a
                        href="/migrate"
                        className={`hover:text-primary-600 dark:hover:text-primary-500 hover:text-violet-800 flex items-center gap-x-4 text-lg ${current === 'migrate' ? 'text-purple-700 dark:text-primary-500' : ''}`}
                      >
                        <RefreshCw size={18} />
                        Migrate/Sync
                      </a>
                    </li>
                    <li>
                      <a
                        href="/timeline"
                        className={`hover:text-primary-600 dark:hover:text-primary-500 hover:text-violet-800 flex items-center gap-x-4 text-lg ${current === 'timeline' ? 'text-purple-700 dark:text-primary-500' : ''}`}
                      >
                        <Calendar size={18} />
                        Timeline
                      </a>
                    </li>
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Link>
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
      {/* {!AppFlags.enableGoogleAds && AppFlags.enableSponsorAds && current === 'home' && (
        <Sponsorhip />
      )} */}
    </>
  );
};

const Sponsorhip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Sponsored Ad Placeholder */}
      <div className="bg-gray-100 py-4 text-center">
        <div className="mx-auto">
          <p className="text-lg font-semibold">Your Ad Here</p>
          <p className="text-sm">
            Interested in promoting your content?{' '}
            <a
              href="mailto:contact.codebuss@gmail.com"
              className="text-blue-500 underline"
            >
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
        <Modal.Body className="text-gray-700">
          <div>
            Our platform is dedicated to keeping the community informed and
            up-to-date on the latest developments in the Obsidian ecosystem.
            <div className="mt-2">
              Key features include:
              <br />
              &nbsp;&nbsp;• Backend system that actively monitors new plugin
              releases and updates.
              <br />
              &nbsp;&nbsp;• Ensuring timely and accurate information delivery.
              <br />
              &nbsp;&nbsp;• Weekly posts highlighting new plugins.
              <br />
              &nbsp;&nbsp;• Comprehensive resources, such as the "Wrapped 2024"
              report.
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <b>Your sponsorship</b> directly supports these efforts by helping
            us cover operational costs and enabling us to continue delivering
            high-quality, valuable content to the community.
            <div className="mt-2">
              With your support, we can
              <br />
              &nbsp;&nbsp;• Sustain and expand our offerings.
              <br />
              &nbsp;&nbsp;• Keep the community engaged, informed, and inspired.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} color="dark">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
