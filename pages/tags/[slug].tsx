
import React from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';

type Props = { };
type State = { };

const Tag = (props) => {
  console.log(props)
  return (
    <div>
      <Header />
      <Navbar current={`tag:${props.tag}`}>
          <div>|</div>
          <Link href={`/tags/${props.tag}`}>
            <a className={itemClasses('tag', 'tag')}>{`tag:${props.tag}`}</a>
          </Link>
      </Navbar>
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            #{props.tag}
          </div>
          <div className='flex-col'>
            {props.plugins.map((plugin, idx) => {
              return (
                <div key={plugin.id} className='group flex py-2 bg-gray-50 hover:bg-white text-gray-700'>
                  <div className='text-3xl font text-violet-900 px-5'>{String(idx+1).padStart(2, '0')}. </div>
                  <div>
                    <a href={`https://github.com/${plugin.repo}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
                    <div className='text-sm'>by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div >{plugin.description}</div>
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

const prisma = new PrismaClient();

export const getStaticPaths = async () => {
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
    paths: Array.from(tags).map(tag => ({params: {slug: tag}})),
    fallback: false,
  }
};

export const getStaticProps = async ({ params }) => {
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

  const plugins = await prisma.plugin.findMany({
    where: {
      pluginId: {
        in: pluginsByTags[params.slug] 
      }
    }
  })

  return {
    props: {
      tag: params.slug,
      pluginIds: pluginsByTags[params.slug],
      plugins,
    }
  }
};

export default Tag;
