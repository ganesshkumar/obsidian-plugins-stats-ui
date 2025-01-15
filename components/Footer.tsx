import { CustomFlowbiteTheme, Footer as FlowbiteFooter } from 'flowbite-react';
import React from 'react';
import Constants from '../constants';
import { Sponsorship } from './Sponsorship';

const customTheme: CustomFlowbiteTheme['footer'] = {
  brand: {
    span: 'self-center whitespace-nowrap text-2xl font-semibold !text-gray-100 dark:text-white',
  },
};

export const Footer = () => {
  const footerLinkClass = 'text-gray-900 underline';
  return (
    <>
      <Sponsorship />
      <section className="w-full bg-gray-200 mt-16 border-b-8 border-b-violet-800">
        
        <FlowbiteFooter
          className="max-w-6xl mx-auto flex flex-col bg-gray-200 rounded-none border-none shadow-none py-8 px-2"
          theme={customTheme}
        >
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="!text-red-50">
              <FlowbiteFooter.Brand
                href="https://www.obsidianstats.com"
                src="/favicon-64.png"
                alt="Obsidian Stats Logo"
                name="Obsidian Stats"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              <div>
                <FlowbiteFooter.Title className="text-gray-900" title="Plugins" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link
                    className={footerLinkClass}
                    href="/plugins"
                  >
                    All Plugins
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/new">
                    New Plugins
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link
                    className={footerLinkClass}
                    href="/updates"
                  >
                    Latest Updates
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link
                    className={footerLinkClass}
                    href="/favorites"
                  >
                    Favorite Plugins
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link
                    className={footerLinkClass}
                    href="/most-downloaded"
                  >
                    Most Downloaded
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link
                    className={footerLinkClass}
                    href="/trending"
                  >
                    Trending Plugins
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/tags">
                    Plugin Tags
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
              <div>
                <FlowbiteFooter.Title className="text-gray-900" title="Posts" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/posts">
                    All Posts
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
              <div>
                <FlowbiteFooter.Title className="text-gray-900" title="Tools" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/migrate">
                    Migrate/Sync
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
              {/* <div>
                <FlowbiteFooter.Title className="text-gray-900" title="Legal" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/privacy-policy">
                    Privacy Policy
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link className={footerLinkClass} href="/cookie-policy">
                    Cookie Policy
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div> */}
            </div>
          </div>
          <FlowbiteFooter.Divider className="border-gray-300" />
          <div className="w-full items-center justify-between">
            <div className="text-sm text-gray-900 text-center">
              © 2022-{new Date().getFullYear()}{' '}
              <a href="/" className="hover:underline" role="link">
                {Constants.AppName}
              </a>
              . All rights reserved.
            </div>
            <div className="my-2 text-sm  dark:text-gray-400 text-center">
              Made with 💜 by{' '}
              <a className="underline" href="https://twitter.com/ganesshkumar">
                @ganesshkumar
              </a>{' '}
              and{' '}
              <a className="underline" href="https://www.codebuss.com">
                Codebuss
              </a>{' '}
              | Find the source code at&nbsp;
              <a
                className="underline"
                href="https://github.com/ganesshkumar/obsidian-plugins-stats-ui"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        </FlowbiteFooter>
      </section>
    </>
  );
};
