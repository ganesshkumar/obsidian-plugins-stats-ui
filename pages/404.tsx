'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { trackEvent } from '../lib/telemetry';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const { asPath, query } = router;
    console.log('404 useEffect', asPath, query);
    trackEvent('404', { path: asPath, query });
  }, []);
  
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='flex divide-x divide-gray-800 gap-x-4'>
        <div className='text-xl'>404</div>
        <div className='pl-4'>This page count not be found</div>
      </div>
      <Link href="/" className='mt-4'>
        <span className='underline'>Go back home</span>
      </Link>
    </div>
  );
};

export default Custom404;