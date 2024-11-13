import { Footer } from 'flowbite-react';
import React from 'react';
import Constants from '../constants';

const AppFooter = () => {
  return (
    <Footer container className='mt-4 bg-gray-800 rounded-none'>
      <div className='max-w-6xl mx-auto '>
        <Footer.Copyright href="/" by={`${Constants.AppName}™`} year={new Date().getFullYear()} className='text-center text-gray-100'/>
        <div className='my-2 text-sm text-gray-100 dark:text-gray-400 text-center'>
          Made with 💜 by <a className='underline' href='https://twitter.com/ganesshkumar'>@ganesshkumar</a> and <a className='underline' href='https://www.codebuss.com'>Codebuss</a> | Find the source code at&nbsp;
          <a className='underline' href='https://github.com/ganesshkumar/obsidian-plugins-stats-ui' target='_blank' rel="noreferrer">
            Github
          </a>
        </div>
        <div className='text-sm text-gray-100 dark:text-gray-400 sm:text-center text-center'>
          <span>If you like this portal, you could consider supporting the development.</span>
          <a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank" rel="noreferrer" className='flex justify-center text-center'>
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" className='w-40 mr-2 mt-2' width="160" height="45" />
          </a>
        </div>
      </div>
    </Footer>
  )
}

export default AppFooter;
