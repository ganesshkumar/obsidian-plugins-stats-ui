import Link from 'next/link';
import { ComponentProps } from 'react';

interface LinkButtonProps extends ComponentProps<'a'> {
  href: string;
  content: string;
  size?: string;
}

export const LinkButton = (props: LinkButtonProps) => {
  const { content, ...rest } = props;
  if (props.size === 'small') {
    return (
      <Link
        {...rest}
        className="font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center text-sm"
      >
        {props.content}
      </Link>
    );
  }
  return (
    <Link
      {...rest}
      className="font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center"
    >
      {props.content}
    </Link>
  );
};
