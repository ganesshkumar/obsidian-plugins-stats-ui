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

interface IPostsPageProps extends IHeaderProps {
  allPostsData: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const title = 'Blog';
  const description = 'Blog posts about obsidain plugins';
  const canonical = 'https://www.obsidianstats.com/posts';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getPostsPageSchema(allPostsData, title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      allPostsData,
    },
  };
};

const Blog = (props: IPostsPageProps) => {
  const postsByYear = props.allPostsData.reduce((acc, post) => {
    const year = post.publishedDate === post.modifiedDate ? post.publishedDate.split('-')[0] : post.modifiedDate.split('-')[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  return (
    <div>
      <Header {...props}/>
      <div>
        <Navbar current="posts" />
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="Posts" />
          <EthicalAd type="text" id="posts-text" />
          <ul>
            {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
              <li key={year}>
                <h2 className="text-xl mb-2 font-semibold">{year}</h2>
                <ul className="flex flex-col divide-y">
                  {postsByYear[year].map((post) => (
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
                              {moment(post.publisedDate === post.modifiedDate ? post.publishedDate : post.modifiedDate).format(
                                'MMMM DD, YYYY'
                              )}
                            </div>
                            <div className="text-medium text-gray-800 mt-4">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
