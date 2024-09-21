
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import { setupFavorites } from '../../utils/favorites';
import Footer from '../../components/Footer';
import NewPluginsList from '../../components/NewPluginsList';

const Tag = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <Navbar current={`tag:${props.tag}`}>
        <Link href={`/tags/${props.tag}`}>
          <a className={itemClasses('tag', 'tag')}>{`tag:${props.tag}`}</a>
        </Link>
      </Navbar>
      <div className='bg-white pt-5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            #{props.tag}
          </div>
          <div className='flex-col'>
            <NewPluginsList plugins={props.plugins} favorites={favorites} setFavorites={setFavorites} />
          </div>
        </div>
      </div>
      <Footer />
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
