
import React, { useEffect, useState } from 'react';
import Header from '../../components/HeaderPlugin';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import moment from 'moment';
import showdown from 'showdown';
import Footer from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import Favorites from '../../components/Favorites';
import NewPluginCard from '../../components/NewPluginCard';
import { tagDenyList } from '../../utils/plugins';
import { isNotXDaysOld } from '../../utils/datetime';

import { Download, DownloadCloud, Star, GitHub, Edit2 } from 'react-feather';

const Tag = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  const [favorites, setFavorites] = useState([]);
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    setupFavorites(setFavorites);
    fetch(`https://api.github.com/repos/${props.plugin.repo}`)
      .then(response => response.json())
      .then(data => {
        const defaultBranch = data.default_branch;
        return fetch(`https://raw.githubusercontent.com/${props.plugin.repo}/${defaultBranch}/README.md`);
      })
      .then(response => response.text())
      .then(data => setReadmeContent(data));
  }, []);

  const isFavorite = favorites.includes(props.plugin.pluginId);
  const isNotADayOld = isNotXDaysOld(props.plugin.createdAt, 1);

  return (
    <div>
      <Header
        pluginId={props.plugin.pluginId}
        name={props.plugin.name}
        description={props.plugin.description}
        author={props.plugin.author}
        latestVersion={props.plugin.latestRelease}
        latestUpdatedAt={moment(props.plugin.latestReleaseAt).fromNow()}
      />
      <Navbar current={`tag:${props.plugin.pluginId}`}>
        <Link href={`/tags/${props.plugin.pluginId}`} className={itemClasses('plugin', 'plugin')}>
          {`plugin: ${props.plugin.pluginId}`}
        </Link>
      </Navbar>
      <div className='bg-white pt-5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex-col bg-gray-50 pb-3 relative'>
            <div className={`text-2xl font-semibold py-5 px-5 uppercase cursor-context-menu text-violet-900 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} mb-2`}>
              <span>🔗</span> {props.plugin.name}
            </div>
            <div className='px-5'>
              {props.tags && 
                <div className='flex flex-wrap mb-2'> 
                  {props.tags?.map(tag => {
                    return (
                      <div key={tag} className='px-2 mr-1 mb-1 text-sm bg-violet-200 rounded-xl' title={`tag: ${tag}`}>
                        <Link href={`/tags/${tag}`}>
                          {tag}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              }
              {/* <div className='flex space-x-1'>
                {isFavorite && <div className='cursor-default text-xl' title='Favorite plugin'>🤩</div>}
                {isNotADayOld && <div className='cursor-default text-xl' title='Less than a day old'>🥳</div>}
                {props.plugin.zScoreTrending > 10 && <div className='cursor-default text-xl' title='Trending plugin'>🔥</div>}
              </div> */}
              <div className='flex gap-x-2 my-2'>
                {isFavorite && <div title='Favorite plugin' className='text-xs bg-red-600 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl'>Favorite</div>}
                {isNotADayOld && <div title='Less than a day old' className='text-xs bg-violet-800 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl'>New Plugin</div>}
                {props.plugin.zScoreTrending > 10 && <div title='Trending plugin' className='text-xs bg-yellow-300 flex justify-center items-center gap-x-1 py-1 px-2 text-gray-700 font-bold rounded-xl'>Trending</div>}
              </div>
              <div className='text-lg mb-5'>{props.plugin.description}</div>
              <Favorites plugin={props.plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
              <div className='text-sm mb-5'>
                by <span>{props.plugin.author}</span>
              </div>
              <div className='mt-1 absolute top-5 right-6 flex gap-x-2' title='Github Repo'>
                <a href={`https://github.com/${props.plugin.repo}`} target='_blank' rel="noreferrer">
                  <GitHub className='text-violet-500' />
                </a>
                <AuthorHelper readmeContent={readmeContent}/>
              </div>
              <div className='flex flex-wrap space-x-4'>
                <div className='flex justify-center items-center space-x-1 cursor-default' title='Stargazers'>
                  <Star className='text-gray-500 inline' size={18} /> 
                  <div>{props.plugin.stargazers}</div>
                </div>
                <div className='flex justify-center items-center space-x-1 cursor-default' title='Total downloads'>
                  <DownloadCloud className='text-gray-500 inline' size={18}/>
                  <div>{props.plugin.totalDownloads?.toLocaleString("en-US")}</div>
                </div>
                <div className='grow justify-self-end'>
                  <div className='flex justify-end items-center space-x-1 cursor-pointer'>
                    <div className='flex items-center space-x-2 border border-violet-800 px-2 rounded bg-violet-800 transition hover:scale-110'>
                      <Download className='text-violet-50 inline' size={18}/>
                      <a href={`obsidian://show-plugin?id=${props.plugin.pluginId}`} className='text-violet-50 inline'>Install</a>
                    </div>
                  </div>
                </div>
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
                <div className='mt-5'>
                  <a className='hover:underline text-violet-700' href={`https://github.com/${props.plugin.repo}/releases`} target='_blank' rel='noreferrer'>See all version on GitHub</a>
                </div>
              </div>
              {readmeContent &&
                <div className='flex-col border border-violet-900 my-2 p-2'>
                  <div className='flex items-center gap-x-1 text-lg'>
                    <div>README file from</div>
                    <div>
                      <a className='hover:underline text-violet-700' href={`https://github.com/${props.plugin.repo}#readme`} target='_blank' rel='noreferrer'>Github</a>
                    </div>
                  </div>
                  <div className='prose mt-4' dangerouslySetInnerHTML={{__html: mdConverter.makeHtml(readmeContent)}} />
                </div>
              }
            </div>
          </div>
          { props.similarPlugins?.length > 0 && 
            <>
              <div className='mt-5 text-xl uppercase bg-violet-50'>💡 Similar Plugins</div>
              <details className='ml-2 text-sm'>
                <summary>info</summary>
                <div className='ml-3'>
                  • Similar plugins are suggested based on the common tags between the plugins.
                </div>
              </details> 
              <div className='flex flex-wrap bg-violet-50'>
                  {props.similarPlugins.map(plugin => 
                      <NewPluginCard key={plugin.pluginId} plugin={plugin} isFavorite={favorites.includes(plugin.pluginId)} isTrending={plugin.zScoreTrending > 10} />)}
              </div>
            </>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

const AuthorHelper = ({ readmeContent }: {readmeContent: string}) => {
  const [author, setAuthor] = useState('');
  const [prompt, setPrompt] = useState('');
  
  useEffect(() => {
    if (window && window.localStorage) {
      const author = localStorage.getItem('author');
      const prompt = localStorage.getItem('prompt');
      setAuthor(author);
      setPrompt(prompt);
    }
  }, []);

  if (!author && !prompt) {
    return undefined;
  }

  const handleClicked = () => {
    const content = prompt.replace('{{READMECONTENT}}', readmeContent);
    navigator.clipboard.writeText(content)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch(() => {
        alert('Failed to copy to clipboard');
      });
  }


  return (
    <div onClick={handleClicked} className='cursor-pointer'>
      <Edit2 className='text-violet-500'/>
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
  const tagsData = await prisma.pluginTags.findMany({
    where: { pluginId: params.slug }
  });
  const tags = tagsData.map(row => row.tag);
  
  const plugin = await prisma.plugin.findFirst({
    where: { pluginId: params.slug }
  });
  
  const pluginIdsInTags = await prisma.pluginTags.findMany({
    where: {
      tag: {
        in: tags.filter(tag => !tagDenyList.includes(tag))
      },
      pluginId: {
        not: plugin.pluginId
      }
    },
    select: { pluginId: true },
    distinct: ['pluginId']
  });
  
  const similarPlugins = await prisma.plugin.findMany({
    where: {
      pluginId: {
        in: pluginIdsInTags.map(pluginIdsInTag => pluginIdsInTag.pluginId)
      }
    },
  });
  
  return {
    props: {
      plugin,
      tags: tags,
      similarPlugins,
    }
  }
};

export default Tag;
