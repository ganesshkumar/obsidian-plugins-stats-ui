import React from 'react';
import { ComponentProps } from 'react';
import { GitHub } from 'react-feather';

interface RepoButtonProps extends ComponentProps<'a'> {
  href: string;
  size?: string;
}

export const RepoButton = (props: RepoButtonProps) => {
  const { href } = props;

  if (props.size === 'small') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="p-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1 px-2 text-sm text-gray-700"
        aria-label="Open GitHub Repository"
      >
        <GitHub size={14} className="text-gray-700" />
        Repo
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1 px-2 text-sm text-gray-700"
      aria-label="Open GitHub Repository"
    >
      <GitHub size={14} className="text-gray-700" />
      Repo
    </a>
  );
};
