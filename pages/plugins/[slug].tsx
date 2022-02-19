
import React from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import moment from 'moment';
import showdown from 'showdown';

type Props = { };
type State = { };

const Tag = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  return (
    <div>
      <Header />
      <Navbar current={`tag:${props.plugin.pluginId}`}>
          <div>|</div>
          <Link href={`/tags/${props.plugin.pluginId}`}>
            <a className={itemClasses('plugin', 'plugin')}>{`plugin:${props.plugin.pluginId}`}</a>
          </Link>
      </Navbar>
      <div className='bg-violet-50 py-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='flex-col bg-gray-50 px-5'>
            <div className='text-2xl pt-5 uppercase bg-gray-50 mb-2'>
              {props.plugin.name}
            </div>
            <div className='flex'>
              {props.tags?.map(tag => {
                return (
                  <div key={tag} className='mr-1 px-2 text-sm bg-violet-200 rounded-xl'>{tag}</div>
                );
              })}
            </div>
            <div>
              by <span>{props.plugin.author}</span>
            </div>
            <div className='mt-2 text-lg'>Description</div>
            <blockquote>{props.plugin.description}</blockquote>
            <div className='mt-2'>
              Repo: <a className='hover:underline text-violet-700' href={`https://github.com/${props.plugin.repo}`} target='_blank' rel="noreferrer">{props.plugin.repo}</a>
            </div>
            <div className='flex'>
              <div>⭐  {props.plugin.stargazers}</div>
              <div className='mx-5'>⬇️  {props.plugin.totalDownloads}</div>
            </div>
            <div className='flex-col border border-violet-900 my-2 p-2'>
              <div className='text-lg'>Latest Version</div>
              <div className='flex'>
                <div className='mr-2 text-violet-700'>
                  <a className='hover:underline' href={`https://github.com/${props.plugin.repo}/releases/tag/${props.plugin.latestRelease}`} target='_blank' rel='noreferrer'>{props.plugin.latestRelease}</a>
                </div>
                <div>{moment(props.plugin.latestReleaseAt).fromNow()}</div>
              </div>
              <div className='mt-2'>Changelog</div>
              <div dangerouslySetInnerHTML={{__html: mdConverter.makeHtml(props.plugin.latestReleaseDesc)}} />
              <a className='hover:underline text-violet-700 mt-5' href={`https://github.com/${props.plugin.repo}/releases`} target='_blank' rel='noreferrer'>See all version on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const prisma = new PrismaClient();

export const getStaticPaths = async () => {
  const plugins = await prisma.plugin.findMany({
    select: { pluginId: true }
  });

  return {
    paths: Array.from(plugins).map(plugin => ({params: {slug: plugin.pluginId}})),
    fallback: false,
  }
};

export const getStaticProps = async ({ params }) => {
  const plugin = await prisma.plugin.findFirst({
    where: { pluginId: params.slug }
  });

  const tags = await prisma.pluginTags.findMany({
    where: { pluginId: params.slug }
  });

  return {
    props: {
      plugin,
      tags: tags.map(row => row.tag),
    }
  }
};

export default Tag;
