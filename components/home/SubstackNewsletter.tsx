import React from 'react';

export const SubstackNewsletter = () => {
  return (
    <div className="bg-transparent mt-32">
      <div className="max-w-6xl mx-auto px-2 flex flex-col rounded bg-gradient-to-r from-violet-600 to-fuchsia-800">
        <div className="flex flex-col justify-center items-center my-12">
          <div className="text-center px-8 text-2xl font-bold text-white">
            Subscribe to our newsletter
            <br />
            to get weekly updates about new plugins and plugin updates
          </div>
        </div>
        <div className="flex justify-center mb-12">
          <iframe
            data-testid="substack-newsletter"
            title="substack-subscribe-form"
            src="https://obsidianpluginstats.substack.com/embed"
            width="480"
            height="320"
            style={{ background: '#FF0000' }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
