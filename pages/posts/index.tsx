import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { Footer } from 'flowbite-react';
import moment, { now } from 'moment';

interface Post {
  id: string;
  publishedDate: string;
  title: string;
}

interface BlogProps {
  allPostsData: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Blog: React.FC<BlogProps> = ({ allPostsData }) => {
  const postsByYear = allPostsData
    .reduce((acc, post) => {
      const year = post.publishedDate.split('-')[0];
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});

  return (
    <div>
    <Header />
    <div>
      <Navbar current='posts' />
    </div>
    <div className='bg-white pt-5'>
      <div className='max-w-6xl mx-auto px-2'>
        <h1 className='text-2xl py-5 text-bold text-violet-900'>
          Posts
        </h1>
        <ul>
          {Object.keys(postsByYear).map((year) => (
            <li key={year}>
              <h2 className='text-xl mb-2 font-semibold'>{year}</h2>
              <ul className='flex flex-col divide-y'>
                {postsByYear[year].map((post) => (
                  <li key={post.id}>
                    <Link href={`/posts/${post.id}`} className='flex justify-between'>
                      <div className='text-lg'>{post.title}</div>
                      <div className='text-medium font-mono text-gray-700'>{moment(post.publishedDate).format('MMMM DD, YYYY')}</div>
                    </Link>           
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default Blog;
