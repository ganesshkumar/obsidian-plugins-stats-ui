
import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import Footer from '../../components/Footer';
import { sanitizeTag, tagDenyList } from '../../utils/plugins';

const Tags = (props) => {
  return (
    <div>
      <Header />
      <div>
        <Navbar current='tags' />
      </div>
      {/* New Plugins */}
      <div className='bg-white pt-5'>
        <div className='max-w-6xl mx-auto px-2'>
          <div className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            ☁️ Tags {props.tags && `(${props.tags.length})`} 
          </div>
          <div className='flex flex-wrap bg-white px-5 py-5'>
            {props.tags.sort().map((tag) => {
              return (
                <Link key={tag} href={`/tags/${tag}`} className='group mx-1 my-1 flex transition hover:scale-110 cursor-pointer' id={`tag-${tag}`}>
                  <div className='border border-dotted border-r-0 rounded-l-md border-violet-700 bg-violet-100 group-hover:bg-violet-900 px-1 pb-1 mr-1/2 group-hover:text-gray-100'>{tag}</div>
                  <div className='border border-dotted rounded-r-2xl border-violet-700 px-1 group-hover:bg-violet-100 px-1 pb-1 mr-1/2 transition'>{props.pluginCountByTags[tag]}</div>
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
  let prisma: PrismaClient = new PrismaClient();

  const tagsData: Record<string, number> = {};
  const plugins = await prisma.plugin.findMany({});
  plugins.forEach((plugin) => {
    const tags = (plugin as any).aiTags.split(',');
    tags.forEach((tag) => {
      const sanitizedTag = sanitizeTag(tag);
      
      if (tagDenyList.includes(sanitizedTag)) {
        return;
      }

      if (tagsData[sanitizedTag] === undefined) {
        tagsData[sanitizedTag] = 0;
      }
      tagsData[sanitizedTag]++;
    });
  });

  return {
    props: {
      tags: Object.keys(tagsData),
      pluginCountByTags: tagsData
    }
  };
}

export default Tags;
