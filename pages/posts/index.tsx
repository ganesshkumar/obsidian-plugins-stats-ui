import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import Header, { IHeaderProps } from '../../components/Header';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import InfoBar from '../../components/InfoBar';
import { Footer } from '../../components/Footer';
import { PostIcon } from '../../components/post/PostIcon';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import { Post } from '../../lib/abstractions';
import EthicalAd from '../../components/EthicalAd';
import { generateSuggestions } from '../../domain/suggestions';
import { Suggestions } from '../../domain/suggestions/models';
import ResponsiveLayout from '../_responsive-layout';
import { Sidebar } from '../../components/Sidebar';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';

interface IPostsPageProps extends IHeaderProps {
  allPostsData: Post[];
  suggestions: Suggestions;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const title = 'Blog';
  const description = 'Blog posts about obsidain plugins';
  const canonical = 'https://www.obsidianstats.com/posts';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getPostsPageSchema(
    allPostsData,
    title,
    description,
    canonical,
    image
  );
  const suggestions = await generateSuggestions({ type: 'posts', slug: '' });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      allPostsData,
      suggestions,
    },
    revalidate: 43200, // twelve hours
  };
};

const Blog = (props: IPostsPageProps) => {
  const postsByMonth = props.allPostsData.reduce((acc, post) => {
    const year = post.publishedDate.split('-')[0];
    const month = post.publishedDate.split('-')[1];
    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(post);
    return acc;
  }, {});

  const isLessThanLarge = useIsLessThanLarge();
  const sidebar = (
    <Sidebar
      pageInfo={{ type: 'posts', slug: '' }}
      suggestions={props.suggestions}
    />
  );

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="posts" />
      </div>
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <InfoBar title="Posts" />
          {isLessThanLarge && (
            <EthicalAd
              type="text"
              style="fixed-footer"
              placementId="posts-fixed-footer"
            />
          )}
          <ul>
            {Object.keys(postsByMonth)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((year) => (
                <li key={year}>
                  <h2 className="text-2xl mb-2 font-semibold text-gray-700 mt-8">
                    {moment(year, 'YYYY-MM').format('MMMM YYYY')}
                  </h2>
                  <ul className="flex flex-col divide-y">
                    {postsByMonth[year].map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/posts/${post.id}`}
                          className="flex justify-between py-4 px-2"
                          prefetch={false}
                        >
                          <div className="flex gap-x-2">
                            <div className="grid place-items-start">
                              <PostIcon tags={post.tags} />
                            </div>
                            <div className="text-lg flex flex-col">
                              <div className="font-semibold hover:underline text-gray-800">
                                {post.title}
                              </div>
                              <div className="text-sm text-gray-500 flex items-end">
                                {moment(post.publishedDate).format(
                                  'MMMM DD, YYYY'
                                )}
                              </div>
                              <div className="text-sm text-gray-800 mt-1">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
