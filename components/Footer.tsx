/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Footer = () => {  
  return (
    <div className='py-2 bg-violet-100'>
      <div className='container w-full lg:w-1/2 mx-auto'>
        <footer className="p-10 footer text-base-content footer-center rounded">
          <div>
            <p>
              Made with 💜 by <a className='hover:underline' href='https://twitter.com/ganesshkumar'>@ganesshkumar</a> | Find the source code at&nbsp;
              <a className='hover:underline' href='https://github.com/ganesshkumar/obsidian-plugins-stats-ui' target='_blank' rel="noreferrer">
                Github
              </a>
            </p>
            <p>Copyright © 2022 - All right reserved by @ganesshkumar.</p>
          </div>
          <div>
            <span>If you like this portal, you could consider supporting the development.</span>
            <a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank" rel="noreferrer">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" className='w-40 mr-2' />
            </a>
          </div> 
        </footer>
      </div>
    </div>
  )
}

export default Footer;
