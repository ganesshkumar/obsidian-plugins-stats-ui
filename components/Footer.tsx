import { CustomFlowbiteTheme, Footer } from 'flowbite-react';
import React from 'react';
import Constants from '../constants';

const customTheme: CustomFlowbiteTheme['footer'] = {
  brand: {
    span: 'self-center whitespace-nowrap text-2xl font-semibold !text-gray-100 dark:text-white',
  },
};

const AppFooter = () => {
  const footerLinkClass = 'text-gray-900 underline';
  return (
    <section className="w-full bg-gray-200 mt-16 border-b-8 border-b-violet-800">
      <Footer
        className="max-w-6xl mx-auto flex flex-col bg-gray-200 rounded-none border-none shadow-none py-8 px-2"
        theme={customTheme}
      >
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="!text-red-50">
            <Footer.Brand
              href="https://obsidian-plugin-stats.ganesshkumar.com"
              src="/favicon-64.png"
              alt="Obsidian Plugin Stats Logo"
              name="Obsidian Plugin Stats"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title className="text-gray-900" title="Plugins" />
              <Footer.LinkGroup col>
                <Footer.Link className={footerLinkClass} href="/plugins">
                  All Plugins
                </Footer.Link>
                <Footer.Link className={footerLinkClass} href="/new">
                  New Plugins
                </Footer.Link>
                <Footer.Link className={footerLinkClass} href="/updates">
                  Latest Updates
                </Footer.Link>
                <Footer.Link className={footerLinkClass} href="/most-downloaded">
                  Most Downloaded
                </Footer.Link>
                <Footer.Link className={footerLinkClass} href="/tags">
                  Tags
                </Footer.Link>
                <Footer.Link className={footerLinkClass} href="/trending">
                  Trending
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="text-gray-900" title="Posts" />
              <Footer.LinkGroup col>
                <Footer.Link className={footerLinkClass} href="/posts">
                  All Posts
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-gray-300" />
        <div className="w-full items-center justify-between">
          <div className="text-sm text-gray-900 text-center">
            © 2022-{new Date().getFullYear()} <a href="/" className="hover:underline">Obsidian Plugin Stats</a>. All rights reserved.
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
      </Footer>
    </section>
  );
};

export default AppFooter;
