import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex divide-x divide-gray-800 gap-x-4">
        <div className="text-xl">404</div>
        <div className="pl-4">This page could not be found</div>
      </div>
      <Link href="/" className="mt-4" prefetch={false}>
        <span className="underline">Go back home</span>
      </Link>
    </div>
  );
};

export default Custom404;
