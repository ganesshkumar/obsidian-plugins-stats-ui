
import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import Footer from '../../components/Footer';
import { tagDenyList } from '../../utils/plugins';

const Tags = (props) => {
  return (
    <div>
      <Header />
      <Navbar current='tags' />
      {/* New Plugins */}
      <div className='bg-violet-50 pt-5'>
        <div className='pb-5 container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50 cursor-context-menu'>
            ☁️ Tags {props.tags && `(${props.tags.length})`} 
          </div>
          <div className='flex flex-wrap bg-gray-50 px-5 py-5'>
            {props.tags.map((tag) => {
              return (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className='group mx-1 my-1 flex transition hover:scale-110 cursor-pointer'>
                    <div className='border border-dotted border-r-0 rounded-l-md border-violet-700 bg-violet-100 group-hover:bg-violet-900 px-1 pb-1 mr-1/2 group-hover:text-gray-100'>{tag}</div>
                    <div className='border border-dotted rounded-r-2xl border-violet-700 px-1 group-hover:bg-violet-100 px-1 pb-1 mr-1/2 transition'>{props.pluginCountByTags[tag]}</div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  
  let tagsData = await prisma.pluginTags.groupBy({
    by: ['tag'],
    where: {
      tag: {
        notIn: tagDenyList
      }
    },
    _count: {
      pluginId: true
    }
  });

  return {
    props: {
      tags: tagsData.map(datum => datum.tag),
      pluginCountByTags: tagsData.reduce((acc, value) => {acc[value.tag] = value['_count'].pluginId; return acc;}, {})
    }
  }
}

export default Tags;
