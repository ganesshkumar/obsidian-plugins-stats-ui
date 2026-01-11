import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Header, { IHeaderProps } from '../../components/Header';
import InfoBar from '../../components/InfoBar';
import ResponsiveLayout from '../_responsive-layout';
import { Author, Post } from '../../lib/abstractions';
import { SiteData } from '../../data/siteData';
import { getSortedPostsData } from '../../lib/posts';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostIcon } from '../../components/post/PostIcon';

interface IAuthorPageProps extends IHeaderProps {
  author: Author;
  slug: string;
  posts: Post[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = SiteData.authors as Record<string, Author>;

  return {
    paths: Object.keys(authors).map((slug) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const authors = SiteData.authors as Record<string, Author>;
  const author = authors[slug] || authors.ganesshkumar;

  if (!author) {
    return { notFound: true };
  }

  const allPosts = getSortedPostsData();
  const posts = allPosts.filter(
    (post) => {
      const postAuthors =
        (post.authors && post.authors.length > 0)
          ? post.authors
          : [authors.ganesshkumar.slug];

      return postAuthors.includes(author.slug);
    }
  );

  const title = `${author.name} - Author at Obsidian Stats`;
  const description = author.bio;
  const canonical = `https://www.obsidianstats.com/authors/${author.slug}`;
  const image = author.avatar || '/images/obsidian-stats-ogImage.png';

  return {
    props: {
      title,
      description,
      canonical,
      image,
      author,
      slug: author.slug,
      posts,
      suggestions: {
        tools: [],
        posts: [],
        similarPlugins: [],
        hasMoreSimilarPlugins: false,
      },
    },
    revalidate: 604800,
  };
};

const AuthorPage = (props: IAuthorPageProps) => {
  const { author, posts } = props;

  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      <div className="bg-white pt-5">
        <ResponsiveLayout>
          <div className="px-4 space-y-8">
            <InfoBar title={author.name} />

            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={author.avatar || undefined} alt={author.name} />
                <AvatarFallback
                  className="bg-gray-100 text-gray-700"
                  style={{
                    backgroundColor: `hsl(${hashStringToHue(author.name)}, 70%, 90%)`,
                    color: `hsl(${hashStringToHue(author.name)}, 70%, 30%)`,
                  }}
                >
                  {author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div>
                  <div className="text-xl font-semibold text-gray-900">{author.name}</div>
                  {author.title && (
                    <div className="text-sm text-gray-600 mt-1">{author.title}</div>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-sm">
                  {author.social?.website && (
                    <a
                      href={author.social.website}
                      className="text-violet-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  )}
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      className="text-violet-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      X (Twitter)
                    </a>
                  )}
                  {author.social?.github && (
                    <a
                      href={author.social.github}
                      className="text-violet-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {author.social?.email && (
                    <a
                      href={`mailto:${author.social.email}`}
                      className="text-violet-700 underline"
                    >
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="space-y-3">
                <div className="text-base font-semibold text-gray-900">About</div>
                <div className="text-sm text-gray-700 leading-relaxed">{author.bio}</div>
                {author.questions && Object.keys(author.questions).length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(author.questions).map(([question, answer]) => (
                      <div key={question} className="rounded border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">{question}</div>
                        <div className="text-sm text-gray-700 mt-1 leading-relaxed">{answer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-lg font-semibold text-gray-900">Recent posts</div>
              {posts.length === 0 && (
                <div className="text-sm text-gray-700">No posts published yet.</div>
              )}
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className="border-b border-gray-200 last:border-none">
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
                            {moment(post.publishedDate).format('MMMM DD, YYYY')}
                          </div>
                          {post.excerpt && (
                            <div className="text-sm text-gray-800 mt-1 leading-relaxed">
                              {post.excerpt}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

function hashStringToHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 360);
}

export default AuthorPage;
