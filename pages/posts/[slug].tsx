'use client';

import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import moment from 'moment';
import { PluginsCache } from '../../cache/plugins-cache';
import { PluginsShareView } from '../share';
import { useEffect, useRef, useState } from 'react';
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
import { useRouter } from 'next/router';
import { PostIcon } from '../../components/post/PostIcon';

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
  suggestedPosts: PostData[];
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
  
  const postsByTag: Record<string, string[]> = {};
  getSortedPostsData().map((post) => {
    const tags = post.tags;
    tags?.forEach((tag) => {
      if (!postsByTag[tag]) {
        postsByTag[tag] = [];
      }
      postsByTag[tag].push(post.id);
    });
  });
  const suggestedPosts = generatePostSuggestions(postsByTag);

  const processedContent = await unified()
    .use(remarkParse)
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
      suggestedPosts: suggestedPosts.map((postId) => getPostData(postId)),
    },
  };
};

function generatePostSuggestions(data: Record<string, string[]>): string[] {
  const selectedIds = new Set<string>();
  // Step 1: Select 3 posts from `weekly-plugin-updates`
  const weeklyPluginUpdates = data['weekly-plugin-updates'];
  const weeklyPosts = getRandomElements(weeklyPluginUpdates, selectedIds, 1);

  // Step 2: Pick 2 more posts from other categories
  const otherTags = Object.keys(data).filter(tag => tag !== 'weekly-plugin-updates');
  const otherPosts: string[] = [];

  otherTags.forEach(tag => {
    if (data[tag].length > 0) {
      otherPosts.push(...data[tag]);
    }
  });

  // Get random 2 posts from the remaining categories
  const selectedOtherPosts = getRandomElements(otherPosts, selectedIds, 4);

  // Combine the posts and return the result
  return [...weeklyPosts, ...selectedOtherPosts];
}

function getRandomElements(arr: string[], selectedIds: Set<string>, count: number): string[] {
  let selected = 0;
  const selectedItems = [];

  while (selected < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];
    if (!selectedIds.has(randomElement)) {
      selectedIds.add(randomElement);
      selectedItems.push(randomElement);
      selected += 1;
    }
  }

  return selectedItems;
}

const Post = (props: IPostPageProps) => {
  const { postData, plugins, suggestedPosts } = props;
  const [comparePlugins, setComparePlugins] = useState(false);
  
  const getGraidentFrom = (index: number) => {
    if (index % 10 === 0) return 'from-blue-100';
    if (index % 10 === 1) return 'from-red-100';
    if (index % 10 === 2) return 'from-green-100';
    if (index % 10 === 3) return 'from-yellow-100';
    if (index % 10 === 4) return 'from-purple-100';
    if (index % 10 === 5) return 'from-pink-100';
    if (index % 10 === 6) return 'from-orange-100';
    if (index % 10 === 7) return 'from-teal-100';
    if (index % 10 === 8) return 'from-indigo-100';
    return 'from-gray-100';
  }

  const getGraidentTo = (index: number) => {
    if (index % 10 === 0) return 'to-pink-100';
    if (index % 10 === 1) return 'to-yellow-100';
    if (index % 10 === 2) return 'to-purple-100';
    if (index % 10 === 3) return 'to-blue-100';
    if (index % 10 === 4) return 'to-green-100';
    if (index % 10 === 5) return 'to-red-100';
    if (index % 10 === 6) return 'to-teal-100';
    if (index % 10 === 7) return 'to-indigo-100';
    if (index % 10 === 8) return 'to-orange-100';
    return 'to-brown-100';
  }

  const [isLessThanLarge, setIsLessThanLarge] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLessThanLarge(window.innerWidth < 1024); // Tailwind's `md` breakpoint is 768px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sidebar = (
    <div>
      <h2 className="mt-1 mb-4 text-2xl">Suggested Posts</h2>
      <div className='flex flex-wrap gap-2'>
        {suggestedPosts.map((post, index) => (
          <a key={post.id} className="flex items-start border border-gray-200 bg-[#fafafa] p-4 w-[400px] min-w-[400px] max-w-[400px] h-[130px] min-h-[130px] max-h-[130px]" href={`/posts/${post.id}`}>
            <div className={`w-[130px] min-w-[130px] max-w-[130px] h-[100px] min-h-[100px] max-h-[100px] bg-gradient-to-br ${getGraidentFrom(index)} ${getGraidentTo(index)} flex justify-center items-center`}>
              <PostIcon tags={post.tags} size={60} />
            </div>
            <p className="text-sm text-gray-700 px-4">{post.title} - {post.publishedDate}</p>
          </a>
        ))}
        <CarbonAd />
      </div>
    </div>
  )

  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar} isLessThanLarge={isLessThanLarge}>
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px]">
            <h1 className="mt-2 mb-0 text-3xl">{postData.title}</h1>
            <div className="mb-4">586
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
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

const CarbonAd = () => {
  const router = useRouter();

  useEffect(() => {
    const isCarbonExist = document.querySelector("#carbonads");

    if (isCarbonExist && typeof (window as any)._carbonads !== 'undefined' && typeof (window as any)._carbonads.refresh === 'function') {
      (window as any)._carbonads.refresh();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.carbonads.com/carbon.js?serve=CW7I6K7Y&placement=wwwobsidianstatscom&format=cover";
    script.id = "_carbonads_js";
    script.async = true;

    document.querySelectorAll("#carbon-container")[0].appendChild(script);
  }, [router.asPath]);

  return <div id="carbon-container"></div>;
};

const ResponsiveLayout: React.FC<{ children: React.ReactNode; sidebar?: React.ReactNode, isLessThanLarge: boolean }> = ({
  children,
  sidebar,
  isLessThanLarge
}) => {
  console.log('isLessThanLarge', isLessThanLarge);
  if (!sidebar) {
    return (
      <div className='max-w-4xl mx-auto px-2'>
        {children}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 2xl:flex 2xl:justify-center 2xl:gap-x-24 gap-4 p-4 md:p-6 xl:p-8 min-h-screen">
      {/* Left Spacer */}
      <div className={`hidden xl:block xl:col-span-1 2xl:col-span-1 2xl:hidden'}`} />

      {/* Main Content */}
      <main className={`col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-8 xl:col-span-7  2xl:max-w-4xl 2xl:grow`}>
        {children}
        {isLessThanLarge && sidebar}
      </main>

      {/* Sidebar */}
      {!isLessThanLarge && (
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 2xl:col-span-3 2xl:max-w-sm 2xl:min-w-[400px]">
        {sidebar}
      </aside>
      )}
      
      {/* Right Spacer */}
      <div className={`hidden xl:block xl:col-span-1 2xl:col-span-1 2xl:hiddens`} />
    </div>
  );
};

export default Post;
