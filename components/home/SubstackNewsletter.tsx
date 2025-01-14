import { Button } from 'flowbite-react';
import React from 'react';
import { Rss } from 'react-feather';

export const SubstackNewsletter = () => {
  return (
    <div className="bg-transparent mt-32">
      <div className="max-w-6xl mx-auto px-2 flex flex-col rounded bg-gradient-to-br from-yellow-200 to-yellow-200">
        <div>
          <div className="text-center px-8 text-2xl font-bold text-gray-800 mt-8">
            Subscribe to our RSS feeds
          </div>
          <div className='text-center px-8 text-gray-800'>
            to get the latest updates on new plugins, weekly plugin updates, and posts.
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="/weekly-plugin-updates-rss.xml" target="_blank" rel="noreferrer">
              <Button color="dark" className="text-white font-bold py-2 px-4 rounded">
                <Rss className="mr-2" size={18} />
                <div>Weekly Plugin Updates</div>
              </Button>
            </a>
            <a href="/rss.xml" target="_blank" rel="noreferrer">
              <Button color="dark" className="text-white font-bold py-2 px-4 rounded">
                <Rss className="mr-2" size={18} />
                New Plugins + Posts
              </Button>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-8 mb-4">
          <div className="text-center px-8 font-bold text-gray-800 text-sm">
            We are also on <a href="https://obsidianpluginstats.substack.com" className="underline" target="_blank" rel="noopener noreferrer">Substack</a> newsletter!
          </div>
        </div>

        {/* <div className="flex justify-center mb-12">
          <iframe
            data-testid="substack-newsletter"
            title="substack-subscribe-form"
            src="c/embed"
            width="480"
            height="320"
            style={{ background: '#FF0000' }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};
