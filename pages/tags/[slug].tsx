
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import { setupFavorites } from '../../utils/favorites';
import Favorites from '../../components/Favorites';
import AuthorAndDescription from '../../components/AuthorAndDescription';

const Tag = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
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
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            #{props.tag}
          </div>
          <div className='flex-col'>
            {props.plugins.map((plugin, idx) => {
              const isFavorite = favorites.includes(plugin.pluginId);
              return (
                <div key={plugin.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
                  <div className='text-3xl font text-gray-400 px-5'>
                    <div>{String(idx+1).padStart(2, '0')}.</div>
                    {isFavorite && <div>🤩</div>}
                  </div>
                  <div>
                    <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
                    <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
                    <AuthorAndDescription author={plugin.author} description={plugin.description} />
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
  const tagsData = await prisma.pluginTags.findMany({
    select: { tag: true },
    distinct: ['tag']
  });

  const tags = tagsData.map(datum => datum.tag);

  return {
    paths: tags.map(tag => ({params: {slug: tag}})),
    fallback: false,
  }
};

export const getStaticProps = async ({ params }) => {
  const tagsData = await prisma.pluginTags.findMany({
    where: { tag: params.slug },
    select: {
      tag: true,
      pluginId: true,
    }
  });
  
  const plugins = await prisma.plugin.findMany({
    where: {
      pluginId: {
        in: tagsData.map(datum => datum.pluginId)
      }
    }
  })

  return {
    props: {
      tag: params.slug,
      plugins,
    }
  }
};

export default Tag;
