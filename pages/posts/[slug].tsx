import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import moment from 'moment';
import { PluginsCache } from '../../cache/plugins-cache';
import { PluginsShareView } from '../share';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { Post as PostData } from '../../lib/abstractions';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { PostIcon } from '../../components/post/PostIcon';
import EthicalAd from '../../components/EthicalAd';
import Comments from '../../components/Comments';
import ResponsiveLayout from '../_responsive-layout';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import { remarkPluginHandler } from '../../domain/remark/plugin-hander';
import { Suggestions } from '../../domain/suggestions/models';
import { generateSuggestions } from '../../domain/suggestions';
import { Sidebar } from '../../components/Sidebar';

interface IPostPageProps extends IHeaderProps {
  postData: PostData;
  plugins: any[];
  suggestions: Suggestions;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();
  const postData = getPostData(params?.slug as string);
  
  const processedContent = await unified()
    .use(remarkParse)
    //.use(remarkPostAd)
    .use(remarkPluginHandler)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    //.use(rehypeToc, { headings: ['h1', 'h2', 'h3'], cssClasses:  { listItem: 'list-none [&>li>a]:no-underline'  } })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(postData.content);
  const contentHtml = processedContent.toString();

  const filteredPlugins =
    postData.plugins
      ?.map((pluginId) => plugins.find((p) => p.pluginId === pluginId))
      .filter((plugin) => !!plugin) ?? [];

  const title = postData.title;
  const description = postData.description;
  const canonical = `https://www.obsidianstats.com/posts/${postData.id}`;
  const image = postData.ogImage || `/images/obsidian-stats-ogImage.png`;
  const jsonLdSchema = JsonLdSchema.getPostPageSchema(postData, title, description, canonical, image);
  const suggestions = await generateSuggestions({type: 'post', slug: postData.id});

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      postData: {
        ...postData,
        contentHtml,
      },
      plugins: filteredPlugins, 
      suggestions,
    },
  };
};

const Post = (props: IPostPageProps) => {
  const { postData, plugins, suggestions } = props;
  const [comparePlugins, setComparePlugins] = useState(false);
  
  const isLessThanLarge = useIsLessThanLarge();

  const sidebar = <Sidebar pageInfo={{ type: 'post', slug: postData.id }} suggestions={suggestions} />;

  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px] prose-h2:text-red-700">
            <h1 className="mt-2 mb-0 text-3xl font-heading leading-20">{postData.title}</h1>
            <div>
              Published: {moment(postData.publishedDate).format('DD-MMM-YYYY')}
            </div>
            {postData.publishedDate !== postData.modifiedDate  &&
              <div>
                Updated: {moment(postData.modifiedDate).format('DD-MMM-YYYY')}
              </div>
            }
            <div className='mt-4 flex justify-center'>
            {isLessThanLarge && <EthicalAd type="fixed-footer" id="post-fixed-footer" />}
            </div>
            {plugins && plugins.length ? (
              <>
                <Button
                  color="dark"
                  onClick={() => setComparePlugins(!comparePlugins)}
                >
                  {comparePlugins ? 'Hide' : 'Compare'} plugins in the post
                </Button>
                {comparePlugins && (
                  <div className="overflow-x-auto">
                    <PluginsShareView
                      pluginIds={plugins.map((p) => p.pluginId)}
                      plugins={plugins}
                      favorites={[]}
                      setFavorites={() => {}}
                    />
                  </div>
                )}
              </>
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <Comments />
          </article>
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
