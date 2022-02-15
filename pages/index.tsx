
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
      <div className='uppercase py-5 text-3xl text-purple-700 font-semibold flex justify-center'>
        <div>Obsidian Plugin Stats</div>
      </div>
      <div className='bg-purple-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5'>
            🌱 New Plugins {props.posts && `(${props.posts.length})`} 
          </div>
          <div className='flex flex-wrap'>
            {props.posts.map(post => {
              return (
                <a key={post.id} href={`https://github.com/${post.repo}`} target="_blank" rel="noreferrer" className='group basis-64 shrink-0 m-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
                  <div className='text-xl font-medium uppercase tracking-wide'>{post.name}</div>
                  <div>by <span className='text-sm group-hover:text-violet-500'>{post.author}</span></div>
                  <div className='mt-5 text-sm'>{post.description}</div>
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
  static newPosts = []

  static getNewPosts() {
    console.log('newPosts cache get')
    return Cache.newPosts;
  }

  static setNewPosts(posts) {
    Cache.newPosts = [...posts];
    console.log('newPosts cache set')
    setTimeout(() => {
      Cache.newPosts = [];
      console.log('newPosts cache invalidated')
    }, 10 * 1000);
  }
}

export const getServerSideProps = async (context) => {
  let posts: any[] = Cache.getNewPosts();

  if (posts.length <= 0) {
    console.log('newPosts cache miss');
    posts = await prisma.plugin.findMany({
      where: { 
        createdAt: {
          gt: Date.now() - (10 * 24 * 60 * 60 * 1000)
        }
      }
    });
    Cache.setNewPosts(posts);
  } else {
    console.log('newPosts cache hit');
  }

  return { props: { posts } }
}


export default Home;
