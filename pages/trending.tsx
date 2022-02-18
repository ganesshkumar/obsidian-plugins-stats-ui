/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

type Props = { };
type State = { };

const Trending = (props) => {
  return (
    <div>
      <Header />
      <Navbar current='trending'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🔥 Trending {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
          </div>
          <div className='bg-gray-50 pb-20'>
            <div className='text-center text-4xl '> 👨‍💻 Coming soon! </div>
            <div className='text-center text-2xl mt-8'> I am working on this page, </div>
            <div className='text-center flex justify-center text-2xl' >
              <a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank" rel="noreferrer">
                <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className='w-40 mr-2' />
              </a>
              <div>and motivate me to finish this trending page sooner.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trending;
