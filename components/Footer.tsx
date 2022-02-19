import React from 'react';

const Footer = () => {  
  return (
    <div className='py-2 border border-t-violet-900 bg-violet-50'>
      <div className='container w-full lg:w-1/2 mx-auto'>
        <div className='text-center'>Made with 💜 by @ganesshkumar</div>
        <div className='text-center'>
          <span>Find the source code at </span>
          <a className='underline' href='https://github.com/ganesshkumar/obsidian-plugins-stats-ui' target='_blank' rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
