import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { Footer } from 'flowbite-react';
import moment from 'moment';
import { Calendar, List, Star } from 'react-feather';

interface Post {
  id: string;
  publishedDate: string;
  title: string;
  excerpt: string;
  tags: string[];
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
  const postsByYear = allPostsData.reduce((acc, post) => {
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
        <Navbar current="posts" />
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <h1 className="text-2xl py-5 text-bold text-violet-900">Posts</h1>
          <ul>
            {Object.keys(postsByYear).map((year) => (
              <li key={year}>
                <h2 className="text-xl mb-2 font-semibold">{year}</h2>
                <ul className="flex flex-col divide-y">
                  {postsByYear[year].map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/posts/${post.id}`}
                        className="flex justify-between py-4 px-2 hover:bg-gray-200"
                      >
                        <div className="flex gap-x-2">
                          <div className="grid place-items-start">
                            <PostIcon tags={post.tags} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xl">{post.title}</div>
                            <div className="text-medium text-gray-600">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                        <div className="text-medium font-mono text-gray-700 flex items-end">
                          {moment(post.publishedDate).format('MMMM DD, YYYY')}
                        </div>
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

const PostIcon = (props) => {
  if (props.tags && props.tags.includes('weekly-plugin-updates')) {
    return <Calendar
      size={48}
      className="text-violet-700 p-1 rounded fill-violet-200"
    />
  } else if (props.tags && props.tags.includes('wrapped-yearly-post')) {
    return <Star
      size={48}
      className="text-yellow-400 p-1 rounded fill-yellow-200"
    />
  } else if (props.tags && props.tags.includes('workflow')) {
    return <List
      size={48}
      className="text-green-400 p-1 rounded fill-yellow-200"
    />
  }
  else {
    return undefined
  }
}

export default Blog;
