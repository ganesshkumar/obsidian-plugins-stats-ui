import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
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
import { visit } from 'unist-util-visit';

function remarkPluginHandler() {
  return async (tree) => {
    const plugins = await PluginsCache.get();
    visit(tree, 'code', (node) => {
      if (node.lang === 'plugin') {
        console.log('Matched plugin code block', node);
        const pluginId = node.value.trim();
        const plugin = plugins.find((p) => p.pluginId === pluginId);
        const authorUrl = `https://github.com/plugin.repo.split('/')[0]`;
        node.type = 'html';
        node.value = `<div class="plugin-container" data-plugin-id="${plugin.name}">
          <div class="plugin-header">
            <h3>${plugin.name}</h3>
          </div>
          <div class="plugin-content">
            <div class="plugin-details">
              <div>
                Released on ${moment(plugin.createdAt).format("YYYY-MM-DD")} by <a href={${authorUrl}}>${plugin.author}</a>
              </div>
              <p>Downloads: ${plugin.osDescription}</p>
            </div>
          </div>
        </div>`;
      }
    });
  };
}

interface IPostPageProps extends IHeaderProps {
  postData: PostData;
  plugins: any[];
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
  console.log(postData)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkPluginHandler)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    //.use(rehypeToc, { headings: ['h1', 'h2', 'h3'], cssClasses:  { listItem: 'list-none [&>li>a]:no-underline'  } })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(postData.content);
  const contentHtml = processedContent.toString();
  console.log("Processed HTML content:", contentHtml);

  const filteredPlugins =
    postData.plugins
      ?.map((pluginId) => plugins.find((p) => p.pluginId === pluginId))
      .filter((plugin) => !!plugin) ?? [];

  const title = postData.title;
  const description = postData.description;
  const canonical = `https://www.obsidianstats.com/posts/${postData.id}`;
  const image = `https://www.obsidianstats.com/logo-512.png`;
  const jsonLdSchema = JsonLdSchema.getPostPageSchema(postData, title, description, canonical, image);

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
    },
  };
};

const Post = (props: IPostPageProps) => {
  const { postData, plugins } = props;
  const [comparePlugins, setComparePlugins] = useState(false);

  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-4xl mx-auto px-2">
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px]">
            <h1 className="mt-2 mb-0 text-3xl">{postData.title}</h1>
            <div className="mb-4">
              Published: {moment(postData.publishedDate).format('DD-MMM-YYYY')}
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
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
