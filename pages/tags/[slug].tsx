
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AppNavbar from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import { setupFavorites } from '../../utils/favorites';
import Footer from '../../components/Footer';
import NewPluginsList from '../../components/NewPluginsList';
import { Navbar } from 'flowbite-react';

const Tag = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <AppNavbar current={`tag:${props.tag}`}>
        <Navbar.Link href={`/tags/${props.tag}`} active={true} className='text-lg'>
          {`tag:${props.tag}`}
        </Navbar.Link>
      </AppNavbar>
      <div className='bg-white pt-5'>
        <div className='max-w-6xl mx-auto px-2'>
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
