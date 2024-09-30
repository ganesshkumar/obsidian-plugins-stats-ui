/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Footer = () => {  
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100'>
        <footer className="p-10 footer text-gray-900 flex flex-col items-center">
          <div>
            <p>
              Made with 💜 by <a className='underline' href='https://twitter.com/ganesshkumar'>@ganesshkumar</a> and <a className='underline' href='https://www.codebuss.com'>Codebuss</a> | Find the source code at&nbsp;
              <a className='underline' href='https://github.com/ganesshkumar/obsidian-plugins-stats-ui' target='_blank' rel="noreferrer">
                Github
              </a>
            </p>
            <p className='text-center mt-2'>Copyright © 2024 - All right reserved by @ganesshkumar.</p>
          </div>
          <div className='mt-12'>
            <span>If you like this portal, you could consider supporting the development.</span>
            <a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank" rel="noreferrer" className='flex justify-center text-center'>
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" className='w-40 mr-2 mt-2' width="160" height="45" />
            </a>
          </div> 
        </footer>
      </div>
    </div>
  )
}

export default Footer;
