
import React from 'react';
import Header from '../components/Header';

import { PrismaClient } from "@prisma/client";

type Props = { };
type State = { };

const HALF_AN_HOUR = 30 * 60 * 1000;

const Home = (props) => {
  return (
    <div>
      <Header />
      {/* Header */}
      <div className='uppercase py-5 text-3xl text-purple-700 font-semibold flex justify-center tracking-wide'>
        <div>Obsidian Plugin Stats</div>
      </div>
      {/* Tags */}
      <div className='flex justify-center pb-5 mb-3'>
        <div className="mx-3 border border-dashed border-violet-700 rounded px-2 py-1 text-violet-700">
          Total Plugins: {props.totalPluginsCount}
        </div>
        <div className="mx-3 border border-dashed border-violet-700 rounded px-2 py-1 text-violet-700">
          New Plugins: {props.newPlugins.length}
        </div>
      </div>
      {/* New Plugins */}
      <div className='bg-purple-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5'>
            🌱 New Plugins {props.newPlugins && `(${props.newPlugins.length})`} 
          </div>
          <div className='flex flex-wrap'>
            {props.newPlugins.map(newPlugin => {
              return (
                <a key={newPlugin.id} href={`https://github.com/${newPlugin.repo}`} target="_blank" rel="noreferrer" className='group basis-64 shrink-0 m-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
                  <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{newPlugin.name}</div>
                  <div>by <span className='text-sm group-hover:text-violet-500'>{newPlugin.author}</span></div>
                  <div className='mt-5 text-sm'>{newPlugin.description}</div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const prisma = new PrismaClient();


class Cache {
  static newPlugins = []
  static data = {}

  static get(key) {
    return Cache.data[key];
  }

  static set(key, value, timeout = HALF_AN_HOUR) {
    Cache.data = Object.assign({}, Cache.data, { key: value });
    
    setTimeout(() => {
      delete Cache.data[key];
    }, 10 * 1000);
  }
}

export const getServerSideProps = async (context) => {
  let newPlugins: any[] = Cache.get('new_plugins') || [];
  if (newPlugins.length <= 0) {
    newPlugins = await prisma.plugin.findMany({
      where: { 
        createdAt: {
          gt: Date.now() - (10 * 24 * 60 * 60 * 1000)
        }
      }
    });
    Cache.set('new_plugins', newPlugins);
  }

  let totalPluginsCount = Cache.get('totalPluginsCount') || -1;
  if (totalPluginsCount < 0) {
    totalPluginsCount = await prisma.plugin.count();
    Cache.set('total_plugins', totalPluginsCount)
  }

  return { props: { newPlugins, totalPluginsCount } }
}


export default Home;
