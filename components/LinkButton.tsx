import React from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { useAnalytics } from '../lib/analytics/analytics';

interface LinkButtonProps extends ComponentProps<'a'> {
  href: string;
  content: string;
  size?: string;
}

const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const LinkButton = (props: LinkButtonProps) => {
  const { content, href } = props;
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    let eventName = '';
    if (href === '/new') {
      eventName = 'See All New Plugins Button Click';
    } else if (href === '/updates') {
      eventName = 'See All Updated Plugins Button Click';
    } else if (href === '/most-downloaded') {
      eventName = 'See All Most Downloaded Plugins Button Click';
    } else if (href === '/trending') {
      eventName = 'See All Trending Plugins Button Click';
    } else {
      eventName = `See All ${capitalizeFirstLetter(href.split('/')[1] || '')} Plugins Button Click`;
    }

    trackEvent(eventName);
    router.push(href);
  };

  if (props.size === 'small') {
    return (
      <button
        onClick={handleClick}
        className="font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center text-sm"
      >
        {content}
      </button>
    );
  }
  return (
    <button
      onClick={handleClick}
      className="font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center"
    >
      {content}
    </button>
  );
};
