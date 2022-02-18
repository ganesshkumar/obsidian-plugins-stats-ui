
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import AppCache from '../cache/appcache';
import moment from 'moment';

type Props = { };
type State = { };

const New = (props) => {
  return (
    <div>
      <Header />
      <Navbar current='new'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🌱 New Plugins {props.newPlugins && `(${props.newPlugins.length})`} 
          </div>
          <div className='flex-col'>
            {props.newPlugins.map((newPlugin, idx) => {
              return (
                <div key={newPlugin.id} className='group flex py-2 bg-gray-50 hover:bg-white text-gray-700'>
                  <div className='text-3xl font text-violet-900 px-5'>{String(idx+1).padStart(2, '0')}. </div>
                  <div>
                    <a href={`https://github.com/${newPlugin.repo}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{newPlugin.name}</a>
                    <div className='text-sm'>{moment(newPlugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{newPlugin.author}</span></div>
                    <div >{newPlugin.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const daysAgo = (days: number) => Date.now() - (days * 24 * 60 * 60 * 1000)

export const getStaticProps = async () => {
  let prisma: PrismaClient;

  let newPlugins: any[] = AppCache.get('new_plugins') || [];
  if (newPlugins.length <= 0) {
    if (!prisma) prisma = new PrismaClient();
    newPlugins = await prisma.plugin.findMany({
      where: { 
        createdAt: {
          gt: daysAgo(10),
        }
      }
    });
    newPlugins.sort((a, b) => b.createdAt - a.createdAt);
    AppCache.set('new_plugins', newPlugins);
  }

  return { props: { newPlugins } };
}

export default New;
