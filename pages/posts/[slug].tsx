import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/HeaderPost';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import moment from 'moment';
import { PluginsCache } from '../../cache/plugins-cache';
import PluginsTable from '../../components/PluginTable';
import { PluginsShareView } from '../share';
import { useState } from 'react';
import { Button } from 'flowbite-react';

interface PostData {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate: string;
  contentHtml: string;
  content: string;
  plugins?: string[];
}

interface PostProps {
  postData: PostData;
  plugins: any[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getPostData(params?.slug as string);
  const processedContent = await remark().use(html).process(postData.content);
  const contentHtml = processedContent.toString();

  const plugins = await PluginsCache.get();  
  const filteredPlugins = postData.plugins
    ?.map((pluginId) => plugins.find((p) => p.pluginId === pluginId))
    .filter((plugin) => !!plugin) ?? [];

  return {
    props: {
      postData: {
        ...postData,
        contentHtml,
      },
      plugins: filteredPlugins
    },
  };
};

const Post: React.FC<PostProps> = ({ postData, plugins }) => {
  const [comparePlugins, setComparePlugins] = useState(false);

  return (
    <div>
      <Header
        title={postData.title}
        description={postData.description}
        publishedDate={postData.publishedDate}
        modifiedDate={postData.modifiedDate}
        slug={postData.id}
      />
      <div>
        <Navbar current="posts" />
      </div>
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-96">
            <h1 className="mt-2 mb-0">{postData.title}</h1>
            <div className="mb-4">
              Published: {moment(postData.publishedDate).format('DD-MMM-YYYY')}
            </div>
            {plugins && plugins.length ?
              <>
                <Button color='dark' onClick={() => setComparePlugins(!comparePlugins)}>{comparePlugins ? 'Compare' : 'Hide'} plugins in the post</Button>
                {comparePlugins &&
                  <div className="overflow-x-auto">
                    <PluginsShareView pluginIds={plugins.map(p => p.pluginId)} plugins={plugins} favorites={[]} setFavorites={() => {}} />
                  </div>
                }
              </> :
              null
            }
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
