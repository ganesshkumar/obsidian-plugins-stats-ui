
import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';

type Props = { };
type State = { };

const humanReadableNumbers = (n: number) => {
  const numString = n.toString();
  if (numString.length > 9) {
    return `${numString.split('').splice(0, numString.length - 6).join('')}B`
  } if (numString.length > 6) {
    return `${numString.split('').splice(0, numString.length - 6).join('')}M`
  } else if (numString.length > 3) {
    return `${numString.split('').splice(0, numString.length - 3).join('')}K`
  }
}

const Tags = (props) => {
  return (
    <div>
      <Header />
      <Navbar current='tags' />
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            ☁️ Tags {props.tags && `(${props.tags.length})`} 
          </div>
          <div className='flex flex-wrap bg-gray-50 px-5 py-5'>
            {props.tags.map((tag) => {
              return (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className='group mx-1 my-1 flex transition hover:scale-110 cursor-pointer'>
                    <div className='border border-dotted border-r-0 rounded-l-md border-violet-700 bg-violet-100 group-hover:bg-violet-900 px-1 pb-1 mr-1/2 group-hover:text-gray-100'>{tag}</div>
                    <div className='border border-dotted rounded-r-2xl border-violet-700 px-1 group-hover:bg-violet-100 px-1 pb-1 mr-1/2 transition'>{props.pluginsByTags[tag].length}</div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async (context) => {
  const prisma = new PrismaClient();

  const pluginsByTags = {};
  const tags = new Set();

  const tagsData = await prisma.pluginTags.findMany();
  
  tagsData.forEach(tagDatum => {
    tags.add(tagDatum.tag);
    if (!(tagDatum.tag in pluginsByTags)) {
      pluginsByTags[tagDatum.tag] = [];
    }
    const plugins = pluginsByTags[tagDatum.tag];
    pluginsByTags[tagDatum.tag] = [...plugins, tagDatum.pluginId];
  })

  return {
    props: {
      tags: Array.from(tags),
      pluginsByTags
    }
  }
}

export default Tags;