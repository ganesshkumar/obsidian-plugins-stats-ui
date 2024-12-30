import Link from 'next/link';
import InfoBar from '../InfoBar';
import { PostIcon } from './PostIcon';
import moment from 'moment';
import LinkButton from '../LinkButton';

export const LatestPosts = ({ posts }) => {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <InfoBar title="Latest Posts" as="h2" />
      <ul className="flex flex-col divide-y mb-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="flex justify-between py-4 px-2"
            >
              <div className="flex gap-x-2">
                <div className="grid place-items-start">
                  <PostIcon tags={post.tags} />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-semibold hover:underline text-gray-800">
                    {post.title}
                  </div>
                  <div className="text-medium text-gray-600 flex items-end">
                    {moment(post.publishedDate).format('MMMM DD, YYYY')}
                  </div>
                  {/* <div className="text-medium text-gray-800 mt-4">
                    {post.excerpt}
                  </div> */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <LinkButton href="/posts" content={`View all posts ⟶`} />
    </div>
  );
};
